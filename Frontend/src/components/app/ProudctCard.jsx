import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Typography,
} from "@material-tailwind/react";
import React from "react";
import { addToCart } from "../redux/cartSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const ProudctCard = ({ item, cardClassName }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const addItem = (product) => {
    dispatch(addToCart(product));
  };
  return (
    <Card
      className={
        cardClassName
          ? `max-w-[26rem] shadow-lg ${cardClassName}`
          : "w-full max-w-[26rem] shadow-lg"
      }
    >
      <CardHeader floated={false} color="blue-gray">
        <img
          src="https://images.unsplash.com/photo-1499696010180-025ef6e1a8f9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
          alt="ui/ux review check"
        />
        <div className="to-bg-black-10 absolute inset-0 h-full w-full bg-gradient-to-tr from-transparent via-transparent to-black/60 " />
      </CardHeader>
      <CardBody>
        <div className="mb-3 flex items-center justify-between">
          <Typography variant="h5" color="blue-gray" className="font-medium">
            {item.title}
          </Typography>
        </div>
        <Typography className="text-xl text-black font-medium">
          {item.price}
        </Typography>
      </CardBody>
      <CardFooter className="pt-2 flex justify-between">
        <Button
          size="md"
          className="bg-[#F7931E]"
          onClick={() => navigate("/checkout")}
        >
          Buy Now
        </Button>
        <Button
          variant="outlined"
          size="md"
          className="text-[#F7931E] border-[#F7931E]"
          onClick={() => addItem(item)}
        >
          Add To Cart
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProudctCard;
