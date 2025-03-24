import React, { useState, useEffect } from "react";
import { NavLink, useLocation, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Layout from "../../app/Layout";
import { useForm, Controller } from "react-hook-form";
import {
  Input,
  Button,
  Select,
  Option,
  Radio,
  Textarea,
} from "@material-tailwind/react";
import { API_URL } from "../../lib/constant";
import { toast } from "react-toastify";
import {
  generateOrderId,
  getFormattedDate,
  isblank,
} from "../../lib/commonFunctions";
import { useSelector } from "react-redux";
import ProductListComponent from "../../app/ProductListComponent";

const Checkout = () => {
  const [productData, setProductData] = useState([]);
  const [userData, setUserData] = useState({});
  const [paymentData, setPaymentData] = useState({});
  const [selectedValue, setSelectedValue] = useState("current");
  const cart = useSelector((state) => state.cart);
  // const { id } = useParams();
  const { state } = useLocation();
  const navigate = useNavigate();
  const user_id = localStorage.getItem("user_id");

  const order_id = generateOrderId();

  const defaultValues = {
    // order_id: order_id,
    order_name: "",
    order_address: "",
    order_city: "",
    order_state: "",
    order_mobile: "",
    order_email: "",
    order_pincode: "",
    order_status: "pending",
    shipping_method: "online payment",
    total_amount: 0,
    // product_id: state?.id || "",
    user_id: user_id,
  };
  const {
    control,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm({ defaultValues });
  const formValues = watch();

  const totalAmount = parseFloat(
    productData?.reduce(
      (acc, item) => acc + item.product_price * item.cartQuantity,
      0
    )
  ).toFixed(2);

  const setCurrentAddress = (response) => {
    response = response || userData;
    reset((formValues) => ({
      ...formValues,
      order_name: response.user_fullname,
      order_address: response.current_address,
      order_state: response.current_state,
      order_city: response.current_city,
      order_mobile: response.user_mobile,
      order_email: response.user_email,
      order_pincode: response.current_pincode,
    }));
  };

  const setPermanentAddress = () => {
    reset((formValues) => ({
      ...formValues,
      order_name: userData.user_fullname,
      order_address: userData.permanent_address,
      order_state: userData.permanent_state,
      order_city: userData.permanent_city,
      order_mobile: userData.user_mobile,
      order_email: userData.user_email,
      order_pincode: userData.permanent_pincode,
    }));
  };

  const onSubmit = (values) => {
    axios
      .post(`${API_URL}/orders/addNew`, {
        ...values,
        total_amount: totalAmount,
        order_items: JSON.stringify(
          productData.map((item) => ({
            quantity: item.cartQuantity,
            price: item.product_price,
            product_id: item.product_id,
          }))
        ),
      })
      .then((response) => {
        if (response.status === 200) {
          toast.success(response.data.message || "Order added Successfully", {
            position: "top-center",
          });
          navigate("/products/laptop");
        }
      })
      .catch((err) => {
        toast.error(err.response.data.message, {
          position: "top-center",
        });
      });
  };

  const getProducts = async () => {
    const response = await axios.get(`${API_URL}/products/${state?.id}`);
    response.data.result = response.data.result.map((item) => {
      return {
        ...item,
        cartQuantity: state?.quantity || 1,
      };
    });
    setProductData(response.data.result);
  };

  const getUser = async () => {
    const response = await axios.get(`${API_URL}/users/${user_id}`);
    const responseData = response.data.result[0];
    setUserData(responseData);
    setCurrentAddress(responseData);
  };

  useEffect(() => {
    if (state?.from === "cart") {
      setProductData(cart.cartItems);
    } else if (state?.id) {
      getProducts();
    }

    if (user_id) {
      getUser();
    }
  }, []);

  const onSubmitError = (error) => {
    Object.values(error).forEach((item, index) => {
      if (index === 0) {
        toast.error(item.message, {
          position: "top-center",
        });
      }
    });
  };

  const handleConfirmOrder = async (e) => {
    if (user_id) {
      if (productData.length > 0) {
        if (formValues.shipping_method === "online payment") {
          const response = await fetch(`${API_URL}/order`, {
            method: "POST",
            body: JSON.stringify({
              amount: Number(totalAmount) * 100,
              currency: "INR",
              receipt: "as",
            }),
            headers: {
              "Content-Type": "application/json",
            },
          });
          const order = await response.json();

          var options = {
            key: "rzp_test_SP8VwXieL6eFC3", // Enter the Key ID generated from the Dashboard
            amount: order.amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
            currency: order.currency,
            name: "SmartTechStore", //your business name
            description: "Test Transaction",
            image: "https://example.com/your_logo",
            order_id: order.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
            handler: async function (response) {
              const body = {
                ...response,
              };

              const validateRes = await fetch(`${API_URL}/order/validate`, {
                method: "POST",
                body: JSON.stringify(body),
                headers: {
                  "Content-Type": "application/json",
                },
              });
              const jsonRes = await validateRes.json();
              setPaymentData(jsonRes);
            },
            prefill: {
              //We recommend using the prefill parameter to auto-fill customer's contact information, especially their phone number
              name: "SmartTechStore", //your customer's name
              email: "smarttechstore@gmail.com",
              contact: "9000000000", //Provide the customer's phone number for better conversion rates
            },
            notes: {
              address: "Razorpay Corporate Office",
            },
            theme: {
              color: "#3399cc",
            },
          };
          var rzp1 = new window.Razorpay(options);
          rzp1.on("payment.failed", function (response) {
            toast.error("Payment failed", {
              position: "top-center",
            });
          });
          rzp1.open();
        } else {
          handleSubmit(onSubmit, onSubmitError)();
        }
      } else {
        toast.error("There are no items found.", {
          position: "top-center",
        });
      }
    } else {
      navigate("/login");
    }

    e.preventDefault();
  };

  const handleCancelOrder = () => {
    navigate(-1);
  };

  const handleRadioChange = (event) => {
    const value = event.target.value;
    if (value === "permanent") {
      setPermanentAddress();
    } else {
      setCurrentAddress();
    }
    setSelectedValue(event.target.value);
  };

  useEffect(() => {
    if (paymentData.msg === "success" && !isblank(paymentData.paymentId)) {
      if (user_id) {
        handleSubmit(onSubmit, onSubmitError)();
      } else {
        navigate("/login");
      }
    }
  }, [paymentData]);

  const handleIncreaseItem = (item) => {
    const filteredData = productData.map((product) => {
      const updated = { ...product };
      if (product.product_id === item.product_id) {
        updated.cartQuantity += 1;
      }
      return updated;
    });
    setProductData(filteredData);
  };

  const handleDecreaseItem = (item) => {
    if (item.cartQuantity === 1) {
      handleRemoveItem(item);
    } else {
      const filteredData = productData.map((product) => {
        const updated = { ...product };
        if (product.product_id === item.product_id) {
          updated.cartQuantity -= 1;
        }
        return updated;
      });
      setProductData(filteredData);
    }
  };

  const handleRemoveItem = (item) => {
    const filteredData = productData.filter(
      (product) => product.product_id !== item.product_id
    );
    setProductData(filteredData);
  };

  return (
    <Layout>
      <div className="my-10 px-4 md:px-0">
        <form className="max-w-4xl mx-auto my-8">
          <h2 className="text-3xl font-medium text-center">Checkout</h2>
          <hr className="my-8 border-[1.3px] border-gray-300" />
          <div className="sm:flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">Order Details</h2>
            <h2 className="text-xl font-medium hidden sm:block">
              Date - {getFormattedDate()}
            </h2>
          </div>

          <ProductListComponent
            data={productData}
            handleIncreaseItem={handleIncreaseItem}
            handleDecreaseItem={handleDecreaseItem}
            handleRemoveItem={handleRemoveItem}
            from="checkout"
          />

          <hr className="my-8 border-[1.3px] border-gray-300" />
          <h2 className="text-2xl font-bold">Shipping Information</h2>

          <div className="md:flex gap-10 my-4">
            <Radio
              name="type"
              value="current"
              label="Same as Current address"
              defaultChecked
              onChange={handleRadioChange}
            />
            <Radio
              name="type"
              value="permanent"
              label="Same as Permanent address"
              onChange={handleRadioChange}
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6 self-auto">
            <Controller
              name="order_name"
              control={control}
              rules={{ required: "Name is required" }}
              render={({ field }) => (
                <Input
                  size="lg"
                  label="Ship to name"
                  error={errors.name && errors.name.message}
                  {...field}
                  containerProps={{
                    className: "!min-w-0",
                  }}
                />
              )}
            />

            <Controller
              name="order_address"
              control={control}
              rules={{ required: "Address is required" }}
              render={({ field }) => (
                <Textarea
                  size="lg"
                  label="Address"
                  error={errors.address && errors.address.message}
                  {...field}
                  containerProps={{
                    className: "!min-w-0",
                  }}
                />
              )}
            />

            <Controller
              name="order_state"
              control={control}
              rules={{ required: "State is required" }}
              render={({ field }) => (
                <Input
                  size="lg"
                  label="State"
                  error={errors.state && errors.state.message}
                  {...field}
                  containerProps={{
                    className: "!min-w-0",
                  }}
                />
              )}
            />

            <Controller
              name="order_city"
              control={control}
              rules={{ required: "City is required" }}
              render={({ field }) => (
                <Input
                  size="lg"
                  label="City"
                  error={errors.city && errors.city.message}
                  {...field}
                  containerProps={{
                    className: "!min-w-0",
                  }}
                />
              )}
            />

            <Controller
              name="order_mobile"
              control={control}
              rules={{
                required: "Mobile number is required",
                maxLength: {
                  value: 10,
                  message: "Mobile number must be 10 digits",
                },
                pattern: {
                  value: /^[0-9]{10}$/,
                  message:
                    "Invalid mobile number. It must contain only digits.",
                },
              }}
              render={({ field }) => (
                <Input
                  size="lg"
                  label="Mobile No."
                  error={errors.mobile && errors.mobile.message}
                  {...field}
                  containerProps={{
                    className: "!min-w-0",
                  }}
                />
              )}
            />

            <Controller
              name="order_email"
              control={control}
              rules={{
                required: "Email is required",
                pattern: {
                  value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                  message: "Invalid email",
                },
              }}
              render={({ field }) => (
                <Input
                  size="lg"
                  label="Email"
                  error={errors.email && errors.email.message}
                  {...field}
                  containerProps={{
                    className: "!min-w-0",
                  }}
                />
              )}
            />

            <Controller
              name="order_pincode"
              control={control}
              rules={{
                required: "Pincode is required",
                pattern: {
                  value: /^[0-9]+$/,
                  message: "Pincode must contain only digits",
                },
                minLength: {
                  value: 6,
                  message: "Pincode must be exactly 6 digits",
                },
                maxLength: {
                  value: 6,
                  message: "Pincode must be exactly 6 digits",
                },
              }}
              render={({ field }) => (
                <Input
                  size="lg"
                  label="Pincode"
                  error={errors.pincode && errors.pincode.message}
                  {...field}
                  containerProps={{
                    className: "!min-w-0",
                  }}
                />
              )}
            />

            <Controller
              name="shipping_method"
              control={control}
              rules={{ required: "Payment method is required" }}
              render={({ field }) => (
                <Select
                  label="Payment method"
                  error={errors.paymentMethod && errors.paymentMethod.message}
                  {...field}
                  containerProps={{
                    className: "!min-w-0",
                  }}
                >
                  <Option value="cash on delivery">Cash on Delivery</Option>
                  <Option value="online payment">Online Payment</Option>
                </Select>
              )}
            />
          </div>

          <hr className="my-8 border-[1.3px] border-gray-300" />
          <h2 className="text-2xl font-bold mb-4">Payment Info</h2>
          <p className="text-green-600 font-semibold mb-6">
            {formValues.shipping_method === "online payment"
              ? "Online Payment"
              : "Cash On Delivery"}
          </p>

          <hr className="my-8 border-[1.3px] border-gray-300" />
          <h2 className="text-2xl font-bold">Billing Info</h2>
          <div className="space-y-4 w-full md:w-5/12 mt-4 mb-10">
            <div className="flex justify-between text-lg">
              <p className="text-green-600 font-semibold">Subtotal</p>
              <p className="text-green-600 font-semibold">₹{totalAmount}</p>
            </div>
            <div className="flex justify-between text-lg">
              <p className="text-green-600 font-semibold">Delivery Charges</p>
              <p className="text-green-600 font-semibold">₹0.00</p>
            </div>
            <hr className="border-[1.3px] border-gray-300" />
            <div className="flex justify-between text-xl">
              <p className="text-green-600 font-semibold">Total Payable</p>
              <p className="text-green-600 font-semibold">₹{totalAmount}</p>
            </div>
          </div>

          <div className="flex flex-wrap gap-4 justify-center sm:justify-between items-center">
            <Button
              variant="outlined"
              size="md"
              className="text-red-600 border-red-600 w-full sm:w-auto"
              onClick={handleCancelOrder}
            >
              Cancel Order
            </Button>
            <Button
              size="md"
              className="bg-teal-500 w-full sm:w-auto"
              onClick={handleConfirmOrder}
            >
              Confirm Order
            </Button>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default Checkout;
