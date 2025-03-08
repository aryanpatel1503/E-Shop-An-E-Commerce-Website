const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
// const multer = require("multer");
const bodyParser = require("body-parser");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const { sendEmail } = require("./EmailService");
// const path = require("path");

const app = express();

// app.use(express.json());
// app.use(express.urlencoded({extended: true, limit: '50mb'}));

app.use(express.json({ limit: "200mb" }));
// app.use(express.urlencoded({ limit: "200mb", extended: true }));

// app.use(bodyParser.json({limit: '50mb'}));
// app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
// app.use(express.json());

app.use(
  cors({
    origin: ["http://localhost:5173"],
    methods: ["POST", "GET", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(cookieParser());
app.use(bodyParser.json());
app.use(
  session({
    secret: "secret", // a secret key to encrypt the session cookie
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false,
      maxAge: 1000 * 60 * 60 * 24,
    },
  })
);

const con = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "",
  database: "e_shop_2024",
});

// for session
app.get("/", (req, res) => {
  if (req.session.user_name) {
    return res.json({
      valid: true,
      user_name: req.session.user_name,
      user_id: req.session.user_id,
    });
  } else {
    return res.json({ valid: false });
  }
});

// User Registration
app.post("/register", (req, res) => {
  const username = req.body.user_name;
  const user_fullname = req.body.user_fullname;
  const email = req.body.user_email;
  const password = req.body.user_password;
  const mobile = req.body.user_mobile;
  const user_gender = req.body.user_gender;
  const permanent_address = req.body.permanent_address;
  const permanent_city = req.body.permanent_city;
  const permanent_state = req.body.permanent_state;
  const permanent_pincode = req.body.permanent_pincode;
  const current_address = req.body.current_address;
  const current_city = req.body.current_city;
  const current_state = req.body.current_state;
  const current_pincode = req.body.current_pincode;

  con.query(
    "INSERT INTO user_reg (user_name, user_fullname, user_email, user_password, user_mobile, user_gender, permanent_address, permanent_city, permanent_state, permanent_pincode, current_address, current_city, current_state, current_pincode ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?) ",
    [
      username,
      user_fullname,
      email,
      password,
      mobile,
      user_gender,
      permanent_address,
      permanent_city,
      permanent_state,
      permanent_pincode,
      current_address,
      current_city,
      current_state,
      current_pincode,
    ],
    (err, result) => {
      if (result) {
        res.status(200);
        res.send({ message: "Registration Successfully", result });
      } else {
        console.log(err);
        res.status(400);
        res.send({ message: "Enter Correct asked details!" });
      }
    }
  );
});

// User Login
app.post("/login", (req, res) => {
  const username = req.body.user_name;
  const password = req.body.user_password;

  con.query(
    "SELECT * FROM user_reg WHERE user_name = ? AND user_password = ?",
    [username, password],
    (err, result) => {
      // console.log(result);
      if (err) {
        req.setEncoding({ err: err });
      } else {
        if (result.length > 0) {
          res.status(200);
          res.send({ message: "Login Successfully", result });
          // req.session.user_name = result[0].user_name;
          // req.session.user_id = result[0].user_id;
          // res.json({Login: true});
          // localStorage.setItem('user_id', result[0].user_id)
          // console.log(req.session.user_id);
        } else {
          res.status(400);
          res.send({ message: "Wrong Username or Password!", Login: false });
        }
      }
    }
  );
});

// forget password
app.post("/user/emailcheck", (req, res) => {
  const email = req.body.user_email;

  con.query(
    "SELECT user_email FROM user_reg WHERE user_email = ?",
    [email],
    (err, result) => {
      if (err) {
        req.setEncoding({ err: err });
      } else {
        if (result.length > 0) {
          res.status(200);
          res.send({ result });
        } else {
          res.status(400);
          res.send({ message: "Email is not registered!" });
        }
      }
    }
  );
});

app.put("/resetpassword", (req, res) => {
  // const id = req.params.id;
  const password = req.body.user_password;
  const email = req.body.user_email;

  con.query(
    "UPDATE USER_REG SET user_password = ? WHERE user_email = ? ",
    [password, email],
    (err, result) => {
      if (result) {
        res.status(200);
        res.send({ result });
      } else {
        console.log(err);
        res.status(400);
        res.send({ message: "An error occurred!" });
      }
    }
  );
});

// Admin Login
app.post("/admin", (req, res) => {
  const adminname = req.body.admin_name;
  const password = req.body.admin_password;

  con.query(
    "SELECT * FROM admin WHERE admin_name = ? AND admin_password = ?",
    [adminname, password],
    (err, result) => {
      if (err) {
        console.log(err);
        req.setEncoding({ err: err });
      } else {
        if (result.length > 0) {
          res.status(200);
          res.send({ result });
        } else {
          console.log(err);
          res.status(400);
          res.send({ message: "Wrong Username or Password!" });
        }
      }
    }
  );
});

// Get all Users
app.get("/users", (req, res) => {
  con.query("SELECT * FROM USER_REG ORDER BY user_id", (err, result) => {
    if (err) {
      res.status(400);
      res.send({ message: "An error occurred!" });
    } else {
      res.status(200);
      res.send({ message: "User get successfully", result });
    }
  });
});

// Get user count
app.get("/users/count", (req, res) => {
  con.query(
    "SELECT COUNT(user_id) as user_count FROM USER_REG ORDER BY user_id",
    (err, result) => {
      if (err) {
        res.status(400);
        res.send({ message: "An error occurred!" });
      } else {
        res.status(200);
        res.send({ result });
      }
    }
  );
});
// Get single User
app.get("/users/:id", (req, res) => {
  const id = req.params.id;
  con.query(
    "SELECT * FROM USER_REG WHERE user_id = ? ",
    [id],
    (err, result) => {
      if (err) {
        res.status(400);
        res.send({ message: "An error occurred!" });
      } else {
        res.status(200);
        res.send({ result });
      }
    }
  );
});

// Delete user
app.delete("/users/:id", (req, res) => {
  const id = req.params.id;
  con.query("DELETE FROM USER_REG WHERE user_id = ? ", [id], (err, result) => {
    if (err) {
      res.status(400);
      res.send({ message: "An error occurred!" });
    } else {
      res.status(200);
      res.send({ message: "Customer Deleted Successfully", result });
    }
  });
});

// Edit User
app.put("/users/:id", (req, res) => {
  const id = req.params.id;
  const username = req.body.user_name;
  const user_fullname = req.body.user_fullname;
  const email = req.body.user_email;
  const password = req.body.user_password;
  const mobile = req.body.user_mobile;
  const user_gender = req.body.user_gender;
  const permanent_address = req.body.permanent_address;
  const permanent_city = req.body.permanent_city;
  const permanent_state = req.body.permanent_state;
  const permanent_pincode = req.body.permanent_pincode;
  const current_address = req.body.current_address;
  const current_city = req.body.current_city;
  const current_state = req.body.current_state;
  const current_pincode = req.body.current_pincode;

  con.query(
    "UPDATE USER_REG SET user_name = ?, user_fullname = ?, user_email = ?, user_password = ?, user_mobile = ?,  user_gender = ?, permanent_address = ?, permanent_city = ?, permanent_state = ?, permanent_pincode = ?, current_address = ?, current_city = ? , current_state = ?, current_pincode = ? WHERE user_id = ? ",
    [
      username,
      user_fullname,
      email,
      password,
      mobile,
      user_gender,
      permanent_address,
      permanent_city,
      permanent_state,
      permanent_pincode,
      current_address,
      current_city,
      current_state,
      current_pincode,
      id,
    ],
    (err, result) => {
      if (result) {
        res.status(200);
        res.send({ message: "Customer Updated successfully", result });
      } else {
        res.status(400);
        res.send({ message: "Enter Correct asked details!" });
      }
    }
  );
});

// Get all Product
app.get("/products", (req, res) => {
  con.query(
    "SELECT p.*, c.category FROM product p INNER JOIN category c ON p.category_id = c.category_id ORDER BY product_id ",
    (err, result) => {
      if (err) {
        res.status(400);
        res.send({ message: "An error occurred!" });
      } else {
        res.status(200);
        res.send({ message: "Product get successfully", result });
      }
    }
  );
});

// Get all Product by category
app.get("/category/:name", (req, res) => {
  const category = req.params.name;

  con.query(
    "SELECT product.*, category.category FROM product INNER JOIN category ON product.category_id = category.category_id WHERE category.category = ?",
    [category],
    (err, result) => {
      if (err) {
        console.log(err);
        res.status(400);
        res.send({ message: "An error occurred!" });
      } else {
        res.status(200);
        res.send({ result });
      }
    }
  );
});

// Get all Product by category and ascending by product name
app.get("/productcategory/:category/asc", (req, res) => {
  const category = req.params.category;

  con.query(
    "SELECT product.product_id, product.product_name, product.product_img, product.product_price,  product.product_desc, category.category FROM product INNER JOIN category ON product.category_id = category.category_id WHERE category.category = ?",
    [category],
    (err, result) => {
      if (err) {
        throw err;
      } else {
        res.send(result);
      }
    }
  );
});

// Get all Product by category and descending by product name
app.get("/productcategory/:category/desc", (req, res) => {
  const category = req.params.category;

  con.query(
    "SELECT product.product_id, product.product_name, product.product_img, product.product_price,  product.product_desc, category.category FROM product INNER JOIN category ON product.category_id = category.category_id WHERE category.category = ? ORDER BY product.product_name desc",
    [category],
    (err, result) => {
      if (err) {
        throw err;
      } else {
        res.send(result);
      }
    }
  );
});

// Get all Product by category and ascending by product price
app.get("/productcategory/:category/ltoh", (req, res) => {
  const category = req.params.category;

  con.query(
    "SELECT product.product_id, product.product_name, product.product_img, product.product_price,  product.product_desc, category.category FROM product INNER JOIN category ON product.category_id = category.category_id WHERE category.category = ? ORDER BY product.product_price asc",
    [category],
    (err, result) => {
      if (err) {
        throw err;
      } else {
        res.send(result);
      }
    }
  );
});

// Get all Product by category and descending by product price
app.get("/productcategory/:category/htol", (req, res) => {
  const category = req.params.category;

  con.query(
    "SELECT product.product_id, product.product_name, product.product_img, product.product_price,  product.product_desc, category.category FROM product INNER JOIN category ON product.category_id = category.category_id WHERE category.category = ? ORDER BY product.product_price desc",
    [category],
    (err, result) => {
      if (err) {
        throw err;
      } else {
        res.send(result);
      }
    }
  );
});

// Get Product count
app.get("/products/count", (req, res) => {
  con.query(
    "SELECT COUNT(product_id) as product_count FROM product ORDER BY product_id ",
    (err, result) => {
      if (err) {
        res.status(400);
        res.send({ message: "An error occurred!" });
      } else {
        res.status(200);
        res.send({ result });
      }
    }
  );
});

// Get Product category count
app.get("/productcategory/count", (req, res) => {
  con.query(
    "SELECT COUNT(category_id) as catcount FROM `category` ORDER BY category_id",
    (err, result) => {
      if (err) {
        res.status(400);
        res.send({ message: "An error occurred!" });
      } else {
        res.status(200);
        res.send({ result });
      }
    }
  );
});

// Add Product

app.post("/products/add", (req, res) => {
  // app.post('/products/add', upload.single('product_img'), (req, res) => {

  const product_name = req.body.product_name;
  const product_desc = req.body.product_desc;
  // const product_category = req.body.product_category;
  const product_img = req.body.product_img;
  const product_price = req.body.product_price;
  const product_color = req.body.product_color;
  const product_size = req.body.product_size;
  const product_storage = req.body.product_storage;
  const product_brand = req.body.product_brand;
  const product_special_features = req.body.product_special_features;
  const product_weight = req.body.product_weight;
  const product_height = req.body.product_height;
  const product_warranty = req.body.product_warranty;
  const product_guarantee = req.body.product_guarantee;
  const product_info = req.body.product_info;
  const category_id = req.body.category_id;

  con.query(
    "INSERT INTO product (product_name, product_desc, product_img, product_price, product_color, product_size, product_storage, product_brand, product_special_features, product_weight, product_height, product_warranty, product_guarantee, product_info, category_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?) ",
    [
      product_name,
      product_desc,
      product_img,
      product_price,
      product_color,
      product_size,
      product_storage,
      product_brand,
      product_special_features,
      product_weight,
      product_height,
      product_warranty,
      product_guarantee,
      product_info,
      category_id,
    ],
    (err, result) => {
      if (err) {
        res.status(400);
        res.send({ message: "Enter Correct asked details!" });
        console.log(err);
      } else {
        res.status(200);
        res.send({ message: "Product added successfully", result });
      }
    }
  );
});

// Delete Product
app.delete("/products/:id", (req, res) => {
  const id = req.params.id;
  con.query(
    "DELETE FROM product WHERE product_id = ? ",
    [id],
    (err, result) => {
      if (err) {
        console.log(err);
        res.status(400);
        res.send({ message: "An error occurred!" });
      } else {
        res.status(200);
        res.send({ message: "Product deleted successfully", result });
      }
    }
  );
});

// Edit Product
app.put("/products/:id", (req, res) => {
  const id = req.params.id;
  const product_name = req.body.product_name;
  const product_desc = req.body.product_desc;
  // const product_category = req.body.product_category;
  const product_img = req.body.product_img;
  const product_price = req.body.product_price;
  const product_color = req.body.product_color;
  const product_size = req.body.product_size;
  const product_storage = req.body.product_storage;
  const product_brand = req.body.product_brand;
  const product_special_features = req.body.product_special_features;
  const product_weight = req.body.product_weight;
  const product_height = req.body.product_height;
  const product_warranty = req.body.product_warranty;
  const product_guarantee = req.body.product_guarantee;
  const product_info = req.body.product_info;
  const category_id = req.body.category_id;

  con.query(
    "UPDATE product SET product_name = ?, product_desc = ?, product_img = ?, product_price = ?, product_color = ?, product_size = ?, product_storage = ?, product_brand = ?, product_special_features = ?, product_weight = ?, product_height = ?, product_warranty = ?, product_guarantee = ?, product_info = ? , category_id = ? WHERE product_id = ? ",
    [
      product_name,
      product_desc,
      product_img,
      product_price,
      product_color,
      product_size,
      product_storage,
      product_brand,
      product_special_features,
      product_weight,
      product_height,
      product_warranty,
      product_guarantee,
      product_info,
      category_id,
      id,
    ],
    (err, result) => {
      if (err) {
        res.status(400);
        res.send({ message: "Enter Correct asked details!" });
      } else {
        res.status(200);
        res.send({ message: "Product updated successfully", result });
      }
    }
  );
});

// Get single product
app.get("/products/:id", (req, res) => {
  const id = req.params.id;
  con.query(
    "SELECT p.*, c.category FROM product p INNER JOIN category c ON p.category_id = c.category_id WHERE product_id = ? ",
    [id],
    (err, result) => {
      if (err) {
        res.status(400);
        res.send({ message: "An error occurred!" });
      } else {
        res.status(200);
        res.send({ message: "Product get successfully", result });
      }
    }
  );
});

// Get all Orders
app.get("/getOrders/:id", (req, res) => {
  const id = req.params.id;

  con.query(
    "SELECT o.*, u.user_name, p.product_name, p.product_desc, p.product_price, p.product_img FROM orders o INNER JOIN user_reg u ON o.user_id = u.user_id INNER JOIN product p ON o.product_id = p.product_id WHERE u.user_id = ? ORDER BY order_id ",
    [id],
    (err, result) => {
      if (err) {
        console.log(err);
        res.status(400);
        res.send({ message: "An error occurred!" });
      } else {
        res.status(200);
        res.send({ message: "Order get successfully", result });
      }
    }
  );
});

// Get all Orders (New)
app.get("/getOrdersNew/:id", (req, res) => {
  const id = req.params.id;

  con.query(
    `SELECT o.*,
     JSON_ARRAYAGG(
        JSON_OBJECT(
            'product_id', p.product_id,
            'product_name', p.product_name,
            'quantity', oi.quantity,
            'product_price', p.product_price,
            'product_desc', p.product_desc,
            'product_img', p.product_img
        )
    ) AS order_items
      FROM orders o INNER JOIN order_items oi ON o.order_id = oi.order_id INNER JOIN product p ON oi.product_id = p.product_id INNER JOIN user_reg u ON o.user_id = u.user_id WHERE u.user_id = ?
    GROUP BY 
      o.order_id
    ORDER BY 
      o.order_id;`,
    [id],
    (err, result) => {
      if (err) {
        console.log(err);
        res.status(400);
        res.send({ message: "An error occurred!" });
      } else {
        res.status(200);
        res.send({ message: "Order get successfully", result });
      }
    }
  );
});

// Get all Orders
app.get("/orders", (req, res) => {
  con.query(
    "SELECT o.*, u.user_name, p.product_name, p.product_desc, p.product_price, p.product_img FROM orders o INNER JOIN user_reg u ON o.user_id = u.user_id INNER JOIN product p ON o.product_id = p.product_id ORDER BY order_id ",
    (err, result) => {
      if (err) {
        console.log(err);
        res.status(400);
        res.send({ message: "An error occurred!" });
      } else {
        res.status(200);
        res.send({ message: "Order get successfully", result });
      }
    }
  );
});

// Get all Orders (New)
app.get("/ordersNew", (req, res) => {
  con.query(
    `SELECT o.*,
     JSON_ARRAYAGG(
        JSON_OBJECT(
            'product_id', p.product_id,
            'product_name', p.product_name,
            'quantity', oi.quantity,
            'product_price', p.product_price,
            'product_desc', p.product_desc,
            'product_img', p.product_img
        )
    ) AS order_items
      FROM orders o INNER JOIN order_items oi ON o.order_id = oi.order_id INNER JOIN product p ON oi.product_id = p.product_id 
    GROUP BY 
      o.order_id
    ORDER BY 
      o.order_id;`,
    (err, result) => {
      if (err) {
        console.log(err);
        res.status(400);
        res.send({ message: "An error occurred!" });
      } else {
        res.status(200);
        res.send({ message: "Order get successfully", result });
      }
    }
  );
});

// Get Orders count
app.get("/orders/count", (req, res) => {
  con.query(
    "SELECT COUNT(order_id) as order_count FROM orders ORDER BY order_id ",
    (err, result) => {
      if (err) {
        res.status(400);
        res.send({ message: "An error occurred!" });
      } else {
        res.status(200);
        res.send({ result });
      }
    }
  );
});

// Add Order (New)
app.post("/orders/addNew", (req, res) => {
  const {
    order_name,
    order_address,
    order_city,
    order_state,
    order_mobile,
    order_email,
    order_pincode,
    order_status,
    shipping_method,
    total_amount,
    user_id,
    order_items,
  } = req.body;
  let orderItems =
    order_items && typeof order_items === "string"
      ? JSON.parse(order_items)
      : [];

  con.beginTransaction((err) => {
    if (err) {
      console.log(err);
      return res.status(500).send({ message: "Transaction start failed" });
      // throw err;
    }

    // Insert into the first table (e.g., products table)

    const orderSql =
      "INSERT INTO orders (order_name, order_address, order_city, order_state, order_mobile, order_email, order_pincode, order_status, shipping_method, total_amount, user_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
    con.query(
      orderSql,
      [
        order_name,
        order_address,
        order_city,
        order_state,
        order_mobile,
        order_email,
        order_pincode,
        order_status,
        shipping_method,
        total_amount,
        user_id,
      ],
      (err, orderResults) => {
        if (err) {
          return con.rollback(() => {
            // throw err;
            console.log("Error inserting into orders table:", err);
            return res.status(500).send({ message: "Failed to insert order" });
          });
        }

        const insertedOrderId = orderResults.insertId; // Get the inserted product ID
        /* const orderItemsValues = orderItems.map((item) => ({
          ...item,
          order_id: insertedOrderId,
        })); */

        const orderItemsValues = orderItems.map((item) => [
          item.quantity,
          item.product_id,
          insertedOrderId,
        ]);

        // Insert into the second table (e.g., orders table) with a reference to the first table
        const orderItemsSql =
          "INSERT INTO order_items (quantity, product_id , order_id) VALUES ?";
        con.query(orderItemsSql, [orderItemsValues], (err, orderResults) => {
          if (err) {
            return con.rollback(() => {
              // throw err;
              console.log("Error inserting into order_items table:", err);
              return res
                .status(500)
                .send({ message: "Failed to insert order items" });
            });
          }

          // Commit the transaction if both inserts succeed
          con.commit((err) => {
            if (err) {
              return con.rollback(() => {
                // throw err;
                console.log("Transaction commit failed:", err);
                return res
                  .status(500)
                  .send({ message: "Transaction commit failed" });
              });
            }

            console.log(
              "Transaction complete, data inserted into both tables!"
            );
            res.status(200).send({ message: "Order placed successfully" });

            // Close the connection after committing
            /*  con.end((err) => {
              if (err) {
                console.error("Error closing connection:", err);
              } else {
                console.log("MySQL connection closed.");
              }
            }); */
          });
        });
      }
    );
  });
});

// Add Order
app.post("/orders/add", (req, res) => {
  const {
    order_id,
    order_name,
    order_address,
    order_city,
    order_state,
    order_mobile,
    order_email,
    order_pincode,
    order_status,
    shipping_method,
    product_id,
    user_id,
  } = req.body;

  con.query(
    "INSERT INTO orders (order_id, order_name, order_address, order_city, order_state, order_mobile, order_email, order_pincode, order_status, shipping_method, product_id, user_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
    [
      order_id,
      order_name,
      order_address,
      order_city,
      order_state,
      order_mobile,
      order_email,
      order_pincode,
      order_status,
      shipping_method,
      product_id,
      user_id,
    ],
    (err, result) => {
      if (result) {
        res.status(200);
        res.send({ message: "Order added successfully", result });
      } else {
        console.log(err);
        res.status(400);
        res.send({ message: "Enter Correct asked details!" });
      }
    }
  );
});

// Delete Order
app.delete("/orders/:id", (req, res) => {
  const id = req.params.id;
  con.query("DELETE FROM orders WHERE order_id = ? ", [id], (err, result) => {
    if (err) {
      res.status(400);
      res.send({ message: "An error occurred!" });
    } else {
      res.status(200);
      res.send({ message: "Order deleted successfully", result });
    }
  });
});

// Edit Order
app.put("/orders/:id", (req, res) => {
  const id = req.params.id;
  const {
    order_name,
    order_address,
    order_city,
    order_state,
    order_mobile,
    order_email,
    order_pincode,
    order_status,
    shipping_method,
    product_id,
    user_id,
  } = req.body;

  con.query(
    "UPDATE orders SET order_name = ?, order_address = ?, order_city = ?, order_state = ?, order_mobile = ?, order_email = ?, order_pincode = ?, order_status = ?, shipping_method = ?, product_id = ?, user_id = ? WHERE order_id = ? ",
    [
      order_name,
      order_address,
      order_city,
      order_state,
      order_mobile,
      order_email,
      order_pincode,
      order_status,
      shipping_method,
      product_id,
      user_id,
      id,
    ],
    (err, result) => {
      if (err) {
        console.log(err);
        res.status(400);
        res.send({ message: "Enter Correct asked details!" });
      } else {
        res.status(200);
        res.send({ message: "Order updated successfully", result });
      }
    }
  );
});

// Update Order (New)
app.put("/orders/update/:orderId", (req, res) => {
  const {
    order_name,
    order_address,
    order_city,
    order_state,
    order_mobile,
    order_email,
    order_pincode,
    order_status,
    shipping_method,
    total_amount,
    user_id,
    order_items,
  } = req.body;
  const { orderId } = req.params;

  let orderItems =
    order_items && typeof order_items === "string"
      ? JSON.parse(order_items)
      : [];

  con.beginTransaction((err) => {
    if (err) {
      console.log(err);
      return res.status(500).send({ message: "Transaction start failed" });
    }

    // Check if the order exists
    const checkOrderSql = "SELECT * FROM orders WHERE order_id = ?";
    con.query(checkOrderSql, [orderId], (err, orderResults) => {
      if (err || orderResults.length === 0) {
        return con.rollback(() => {
          console.log("Order not found or query failed:", err);
          return res.status(404).send({ message: "Order not found" });
        });
      }

      // Update the order in the `orders` table
      const updateOrderSql =
        "UPDATE orders SET order_name = ?, order_address = ?, order_city = ?, order_state = ?, order_mobile = ?, order_email = ?, order_pincode = ?, order_status = ?, shipping_method = ?, total_amount = ?, user_id = ? WHERE order_id = ?";
      con.query(
        updateOrderSql,
        [
          order_name,
          order_address,
          order_city,
          order_state,
          order_mobile,
          order_email,
          order_pincode,
          order_status,
          shipping_method,
          total_amount,
          user_id,
          orderId,
        ],
        (err, updateResults) => {
          if (err) {
            return con.rollback(() => {
              console.log("Error updating order:", err);
              return res
                .status(500)
                .send({ message: "Failed to update order" });
            });
          }

          // Delete existing order items for this order (optional, based on use case)
          const deleteOrderItemsSql =
            "DELETE FROM order_items WHERE order_id = ?";
          con.query(deleteOrderItemsSql, [orderId], (err) => {
            if (err) {
              return con.rollback(() => {
                console.log("Error deleting order items:", err);
                return res
                  .status(500)
                  .send({ message: "Failed to delete order items" });
              });
            }

            const numOrderId = Number(orderId);
            // Insert updated order items
            const orderItemsValues = orderItems.map((item) => [
              item.quantity,
              item.product_id,
              numOrderId,
            ]);

            const insertOrderItemsSql =
              "INSERT INTO order_items (quantity, product_id, order_id) VALUES ?";
            con.query(insertOrderItemsSql, [orderItemsValues], (err) => {
              if (err) {
                return con.rollback(() => {
                  console.log("Error inserting new order items:", err);
                  return res
                    .status(500)
                    .send({ message: "Failed to insert new order items" });
                });
              }

              // Commit the transaction if both updates succeed
              con.commit((err) => {
                if (err) {
                  return con.rollback(() => {
                    console.log("Transaction commit failed:", err);
                    return res
                      .status(500)
                      .send({ message: "Transaction commit failed" });
                  });
                }

                console.log(
                  "Transaction complete, order and items updated successfully!"
                );
                res.status(200).send({ message: "Order updated successfully" });
              });
            });
          });
        }
      );
    });
  });
});

// Get single order
app.get("/orders/:id", (req, res) => {
  const id = req.params.id;
  con.query("SELECT * FROM orders WHERE order_id = ? ", [id], (err, result) => {
    if (err) {
      res.status(400);
      res.send({ message: "An error occurred!" });
    } else {
      res.status(200);
      res.send({ message: "Order get successfully", result });
    }
  });
});

// Get single order (New)
app.get("/ordersNew/:id", (req, res) => {
  const id = req.params.id;
  con.query(
    `SELECT o.*,
     JSON_ARRAYAGG(
        JSON_OBJECT(
            'product_id', p.product_id,
            'product_name', p.product_name,
            'quantity', oi.quantity,
            'product_price', p.product_price,
            'product_desc', p.product_desc,
            'product_img', p.product_img
        )
    ) AS order_items
      FROM orders o INNER JOIN order_items oi ON o.order_id = oi.order_id INNER JOIN product p ON oi.product_id = p.product_id 
    WHERE o.order_id = ?`,
    [id],
    (err, result) => {
      if (err) {
        res.status(400);
        res.send({ message: "An error occurred!" });
      } else {
        res.status(200);
        res.send({ message: "Order get successfully", result });
      }
    }
  );
});

// Get all feedback
app.get("/feedback", (req, res) => {
  con.query(
    "SELECT f.*, u.user_name, p.product_name FROM feedback f INNER JOIN user_reg u ON f.user_id = u.user_id INNER JOIN product p ON f.product_id = p.product_id ORDER BY f.feedback_id",
    (err, result) => {
      if (err) {
        console.log(err);
        res.status(400);
        res.send({ message: "An error occurred!" });
      } else {
        res.send(result);
      }
    }
  );
});

// Get all feedback by product
app.get("/feedback/:id", (req, res) => {
  const id = req.params.id;

  con.query(
    "SELECT feedback.feedback_id, feedback.feedback_id, feedback.feedback, user_reg.user_name FROM feedback INNER JOIN user_reg ON feedback.user_id = user_reg.user_id WHERE product_id = ?",
    [id],
    (err, result) => {
      if (err) {
        throw err;
      } else {
        res.status(200);
        res.send({ result });
      }
    }
  );
});

// Add Feedback
app.post("/feedback/add", (req, res) => {
  const feedback = req.body.feedback;
  const user_id = req.body.user_id;
  const product_id = req.body.product_id;

  con.query(
    "INSERT INTO feedback (feedback, user_id, product_id) VALUES (?, ?, ?) ",
    [feedback, user_id, product_id],
    (err, result) => {
      if (result) {
        res.send({ message: "Feedback added successfully", result });
      } else {
        console.log(err);
        res.status(400);
        res.send({ message: "Enter Correct asked details!" });
      }
    }
  );
});

// Add contact
app.post("/contact/add", (req, res) => {
  const username = req.body.username;
  const email = req.body.email;
  const subject = req.body.subject;
  const message = req.body.message;

  con.query(
    "INSERT INTO contact (username, email,  subject, message) VALUES (?, ?, ?, ?) ",
    [username, email, subject, message],
    (err, result) => {
      if (result) {
        res.status(200);
        res.send({ message: "Contact added successfully", result });
      } else {
        console.log(err);
        res.status(400);
        res.send({ message: "Enter Correct asked details!" });
      }
    }
  );
});

// View order for user
app.get("/userorders/:id", (req, res) => {
  const id = req.params.id;

  con.query(
    "SELECT orders.order_id, product.product_name, product.product_img, product.product_price, product.product_desc FROM orders INNER JOIN product ON orders.product_id = product.product_id WHERE user_id = ?",
    [id],
    (err, result) => {
      if (err) {
        throw err;
      } else {
        res.send(result);
      }
    }
  );
});

// Get all Category
app.get("/category", (req, res) => {
  con.query("SELECT * FROM category", (err, result) => {
    if (err) {
      res.status(400);
      res.send({ message: "An error occurred!" });
    } else {
      res.status(200);
      res.send({ message: "Category get successfully", result });
    }
  });
});

// get a single category
app.get("/getCategory/:id", (req, res) => {
  const category_id = req.params.id;

  con.query(
    "SELECT * FROM category WHERE category_id = ?",
    [category_id],
    (err, result) => {
      if (err) {
        res.status(400);
        res.send({ message: "An error occurred!" });
      } else {
        res.status(200);
        res.send({ message: "Category get successfully", result });
      }
    }
  );
});

// Add Category
app.post("/category/add", (req, res) => {
  const category = req.body.category;
  const category_img = req.body.category_img;
  con.query(
    "INSERT INTO category (category, category_img) values (?, ?)",
    [category, category_img],
    (err, result) => {
      if (err) {
        res.status(400);
        res.send({ message: "An error occurred!" });
      } else {
        res.status(200);
        res.send({ message: "Category added successfully", result });
      }
    }
  );
});

// Edit Category
app.put("/category/:id", (req, res) => {
  const id = req.params.id;
  const category = req.body.category;
  const category_img = req.body.category_img;
  con.query(
    "UPDATE category SET category = ?, category_img = ? WHERE category_id = ?",
    [category, category_img, id],
    (err, result) => {
      if (err) {
        console.log(err);
        res.status(400);
        res.send({ message: "An error occurred!" });
      } else {
        res.status(200);
        res.send({ message: "Category updated successfully", result });
      }
    }
  );
});

// delete category
app.delete("/category/:id", (req, res) => {
  const id = req.params.id;
  // con.query("DELETE FROM category WHERE category_id = ?", [id], (err, result) => {
  con.query(
    "DELETE FROM CATEGORY WHERE category_id = ? ",
    [id],
    (err, result) => {
      if (err) {
        res.status(400);
        res.send({ message: "An error occurred!" });
      } else {
        res.status(200);
        res.send({ message: "Category deleted successfully", result });
      }
    }
  );
});

// Get Orders count
app.get("/counts", (req, res) => {
  con.query(
    "SELECT (SELECT COUNT(*) FROM user_reg) AS total_users,(SELECT COUNT(*) FROM product) AS total_products,(SELECT COUNT(*) FROM `orders`) AS total_orders,(SELECT COUNT(*) FROM category) AS total_categories",
    (err, result) => {
      if (err) {
        res.status(400);
        res.send({ message: "An error occurred!" });
      } else {
        res.status(200);
        res.send({ result });
      }
    }
  );
});

// Endpoint to trigger email notifications
app.post("/send-email", async (req, res) => {
  const { email, product, price, image } = req.body;

  try {
    await sendEmail({
      recipients: email,
      subject: "New Product Added",
      text: `The product "${product}" has been added.`,
      product,
      price,
      image,
    });
    res.status(200).send("Email sent successfully");
  } catch (error) {
    res.status(500).send("Error sending email");
  }
});

app.listen(3001, () => {
  console.log("running backend server");
});
