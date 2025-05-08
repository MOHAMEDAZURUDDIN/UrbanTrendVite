import MetaData from "../layouts/MetaData";
import { Fragment, useEffect } from "react";
import { validateShipping } from "./Shipping";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import CheckoutSteps from "./CheckoutStep";

export default function ConfirmOrder() {
  const { shippingInfo, items: cartItems } = useSelector(
    (state) => state.cartState
  );
  console.log('shp:',shippingInfo);
  

  const { user } = useSelector((state) => state.authState);
  const navigate = useNavigate();

  const itemsPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const shippingPrice = itemsPrice > 400 ? 0 : 10;
  let taxPrice = Number(0.05 * itemsPrice);
  const totalPrice = Number(itemsPrice + shippingPrice + taxPrice).toFixed(2);
  taxPrice = Number(taxPrice).toFixed(2);

  const processPayment = () => {
    const data = {
      itemsPrice,
      shippingPrice,
      taxPrice,
      totalPrice,
    };
    sessionStorage.setItem("orderInfo", JSON.stringify(data));
    navigate("/payment");
  };

  useEffect(() => {
    validateShipping(shippingInfo, navigate);
  }, [navigate, shippingInfo]);

  return (
    <>
      <div className="bg-black clip-path h-[65vh] lg:h-[75vh] md:h-[45vh] sm:h-[25vh] w-auto absolute top-0 left-0 right-0 opacity-90 z-10 "></div>

      <div className="relative opacity-100 z-20 min-h-screen px-4 sm:px-0  py-2  text-slate-600 ">
        <MetaData title={"Confirm Order"} />
        <div className="mt-20">
          <CheckoutSteps shipping confirmOrder />
        </div>
        <div className="flex items-start justify-center md:flex-row px-8 mt-5">
          <div className="md:w-1/3 mb-5 ">
            <div className="mb-5">
              <h4 className="p-2 text-xl font-bold font-palanquin">
                Shipping Info
              </h4>
              <hr className="border-gray-400 w-36" />
              <p className="px-2 mt-2">
                <b>Name:</b> <span className="text-blue-700">{user.name}</span>
              </p>
              <p className="px-2">
                <b>Phone:</b>{" "}
                <span className="text-blue-700">{shippingInfo.phoneNo}</span>
              </p>
              <p className="mb-4 px-2">
                <b>Address:</b>{" "}
                <span className="text-blue-700">
                  {shippingInfo.address}, {shippingInfo.city},
                  {shippingInfo.postalCode}, {shippingInfo.state},
                  {shippingInfo.country}
                </span>
              </p>
            </div>
            <div>
              <h4 className="font-bold text-xl font-palanquin">
                Order Summary
              </h4>
              <hr className="border-gray-400 w-36" />

              <p className="mt-2 px-2 text-lg text-blue-700">
                Subtotal: $
                <span className="text-red-400 font-bold text-lg">
                  {itemsPrice.toFixed(2)}
                </span>
              </p>
              <p className="px-2 text-lg text-blue-700">
                Shipping: $
                <span className="text-red-400 font-bold text-lg">
                  {shippingPrice}
                </span>
              </p>
              <p className="px-2 text-lg text-blue-700">
                Tax: $
                <span className="text-red-400 font-bold text-lg">
                  {taxPrice}
                </span>
              </p>

              <hr className="border-gray-400 w-40" />

              <p className="px-2  text-lg text-blue-700">
                <b>Total:</b> $
                <span className="text-red-400 font-bold text-lg">
                  {totalPrice}
                </span>
              </p>

              <button
                id="checkout_btn"
                onClick={processPayment}
                className="px-4 py-3 text-white bg-gradient-to-b from-rose-700 to-rose-700 via-red-700 rounded mt-5 font-bold w-auto shadow-xl hover:shadow-red-500 hover:scale-105 duration-300 focus:outline-none"
              >
                Proceed to Payment
              </button>
            </div>
          </div>

          <div className="md:w-1/3 sm:ml-2">
            <h4 className="mt-4 text-xl font-bold mb-1 font-palanquin">
              Your Cart Items:
            </h4>
            <hr className="border-gray-400 w-40" />

            {cartItems.map((item) => (
              <Fragment key={item.product}>
                <div className=" bg-slate-700 w-64 my-4 flex items-center justify-center space-x-4 rounded">
                  <img
                    src={item.image}
                    alt={item.name}
                    className=" h-16 w-16 -rotate-12 hover:-rotate-[360deg] duration-500 rounded"
                  />

                  <div className="flex-1">
                    <div className="text-pale-blue">{item.name}</div>
                    <div className="bg-rose-700 rounded w-36 text-center">
                      <p className="text-white-400 text-md">
                        {item.quantity} x ${item.price} ={" "}
                        <span className="text-black font-bold">
                          ${item.quantity * item.price}
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
              </Fragment>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
