import { useElements, useStripe } from "@stripe/react-stripe-js";
import {
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
} from "@stripe/react-stripe-js";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { orderCompleted } from "../../slices/cartSlice";
import { validateShipping } from "./Shipping";
import { createOrder } from "../../actions/orderActions";
import { clearError as clearOrderError } from "../../slices/orderSlice";
import MetaData from "../layouts/MetaData";
import CheckoutSteps from "./CheckoutStep";

export default function Payment() {
  const stripe = useStripe();
  const elements = useElements();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"));
  const { user } = useSelector((state) => state.authState);
  const { items: cartItems, shippingInfo } = useSelector(
    (state) => state.cartState
  );
  const { error: orderError } = useSelector((state) => state.orderState);

  const paymentData = {
    amount: Math.round(orderInfo.totalPrice * 100),
    shipping: {
      name: user.name,
      address: {
        city: shippingInfo.city,
        postal_code: shippingInfo.postalCode,
        country: shippingInfo.country,
        state: shippingInfo.state,
        line1: shippingInfo.address,
      },
      phone: shippingInfo.phoneNo,
    },
  };

  const order = {
    orderItems: cartItems,
    shippingInfo,
  };

  if (orderInfo) {
    order.itemsPrice = orderInfo.itemsPrice;
    order.shippingPrice = orderInfo.shippingPrice;
    order.taxPrice = orderInfo.taxPrice;
    order.totalPrice = orderInfo.totalPrice;
  }

  useEffect(() => {
    validateShipping(shippingInfo, navigate);
    if (orderError) {
      toast(orderError, {
        position: toast.POSITION.BOTTOM_CENTER,
        type: "error",
        onOpen: () => {
          dispatch(clearOrderError());
        },
      });
      return;
    }
  }, [dispatch, navigate, orderError, shippingInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();
    document.querySelector("#pay_btn").disabled = true;
    try {
      const { data } = await axios.post("/api/v1/payment/process", paymentData);
      const clientSecret = data.client_secret;
      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardNumberElement),
          billing_details: {
            name: user.name,
            email: user.email,
          },
        },
      });

      if (result.error) {
        toast(result.error.message, {
          type: "error",
          position: toast.POSITION.BOTTOM_CENTER,
        });
        document.querySelector("#pay_btn").disabled = false;
      } else {
        if ((await result).paymentIntent.status === "succeeded") {
          toast("Payment Success!", {
            type: "success",
            position: toast.POSITION.BOTTOM_RIGHT,
          });
          order.paymentInfo = {
            id: result.paymentIntent.id,
            status: result.paymentIntent.status,
          };
          dispatch(orderCompleted());
          dispatch(createOrder(order));

          navigate("/order/success");
        } else {
          toast("Please Try again!", {
            type: "warning",
            position: toast.POSITION.BOTTOM_CENTER,
          });
        }
      }
    } catch (error) {}
  };

  return (
    <div className="min-h-screen flex flex-col bg-black ">
      <MetaData title={"Payment Info"} />
      <div className="mt-20">
        <CheckoutSteps shipping confirmOrder payment />
      </div>


      <div className=" max-w-md w-full mx-auto bg-gradient-to-b from-slate-800 to-slate-800 via-slate-600 p-8 rounded-md shadow-md ">
      <div className="text-3xl mb-6 font-bold text-white-400 text-center font-palanquin">
          <span className="text-red-500">Payment</span> Info
        </div>
          <form onSubmit={submitHandler} className="space-y-4">
            <div className="">
              <label
                htmlFor="card_num_field"
                className="block mb-1 font-bold"
              >
                Card Number
              </label>
              <CardNumberElement
                type="text"
                id="card_num_field"
                className=" mt-1 p-3 w-full bg-gray-200 rounded-md border border-blue-500"
              />
            </div>

            <div className="form-group">
              <label
                htmlFor="card_exp_field"
                className="block mb-1 font-bold mt-2"
              >
                Card Expiry
              </label>
              <CardExpiryElement
                type="text"
                id="card_exp_field"
                className=" mt-1 p-3 w-full bg-gray-200 rounded-md border border-blue-500"
              />
            </div>

            <div className="form-group">
              <label
                htmlFor="card_cvc_field"
                className="block mb-1 font-bold "
              >
                Card CVC
              </label>
              <CardCvcElement
                type="text"
                id="card_cvc_field"
                className=" mt-1 p-3 w-full bg-gray-200 rounded-md border border-blue-500"
                value=""
              />
            </div>

            <button
              id="pay_btn"
              type="submit"
              className="w-full mb-3 py-3 mt-4 bg-gradient-to-br from-red-600 to-rose-900 via-rose-600 text-slate-900 font-bold text-xl rounded hover:scale-105 duration-300 focus:outline-none"
            >
              Pay - {` $${orderInfo && orderInfo.totalPrice}`}
            </button>
          </form>
        
      </div>
    </div>
  );
}
