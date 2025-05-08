import { Fragment, useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  orderDetail as orderDetailAction,
  updateOrder,
} from "../../actions/orderActions";
import { toast } from "react-toastify";
import { clearOrderUpdated, clearError } from "../../slices/orderSlice";
import { Link } from "react-router-dom";

export default function UpdateOrder() {
  const { loading, isOrderUpdated, error, orderDetail } = useSelector(
    (state) => state.orderState
  );
  const {
    user = {},
    orderItems = [],
    shippingInfo = {},
    totalPrice = 0,
    paymentInfo = {},
  } = orderDetail;
  const isPaid = paymentInfo.status === "succeeded" ? true : false;
  const [orderStatus, setOrderStatus] = useState("Processing");
  const { id: orderId } = useParams();

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    const orderData = {};
    orderData.orderStatus = orderStatus;
    dispatch(updateOrder(orderId, orderData));
  };

  useEffect(() => {
    if (isOrderUpdated) {
      toast("Order Updated Succesfully!", {
        type: "success",
        position: toast.POSITION.BOTTOM_CENTER,
        onOpen: () => dispatch(clearOrderUpdated()),
      });

      return;
    }

    if (error) {
      toast(error, {
        position: toast.POSITION.BOTTOM_CENTER,
        type: "error",
        onOpen: () => {
          dispatch(clearError());
        },
      });
      return;
    }

    dispatch(orderDetailAction(orderId));
  }, [isOrderUpdated, error, dispatch, orderId]);

  useEffect(() => {
    if (orderDetail._id) {
      setOrderStatus(orderDetail.orderStatus);
    }
  }, [orderDetail]);

  return (
    <>
      <div className="bg-black clip-path h-[75vh] lg:h-[65vh] md:h-[55vh] sm:h-[50vh] w-auto absolute top-0 left-0 right-0 opacity-90 z-10"></div>
      <div
        className={` text-white-400 sm:text-black relative opacity-100 z-20 min-h-screen font-montserrat px-4 py-2 overflow-hidden`}
      >
        <div className="col-span-1 md:col-span-2 mt-24">
          <Sidebar />
        </div>
        <h1 className={`text-2xl font-semibold text-white mb-4 text-center`}>
          <span className="text-red-500">Order #</span> {orderDetail._id}
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-slate-500">
          <div>
            <div className="mb-4">
              <h2 className={`text-lg text-gray-400 font-semibold font-palanquin`}>
                Shipping Info
              </h2>
              <hr className=" border-slate-900 w-32" />
              <p className="mb-1 ">
                <b>Name:</b> <span>{user.name}</span>
              </p>
              <p className="mb-1">
                <b>Phone:</b> <span>{shippingInfo.phoneNo}</span>
              </p>
              <p className="mb-1">
                <b>Address:</b>{" "}
                <span>
                  {shippingInfo.address},{shippingInfo.city},
                  {shippingInfo.postalCode},{shippingInfo.state},
                  {shippingInfo.country}
                </span>
              </p>

              <div className="mt-4">
                <h2 className={`text-lg text-gray-500 font-semibold font-palanquin`}>
                  Payment
                </h2>
                <hr className=" border-slate-900 w-20" />
                <p>
                  <b>Amount:</b> $
                  <span className="text-coral-red font-bold">{totalPrice}</span>
                </p>
                <p className={isPaid ? "text-green-600" : "text-red-600"}>
                  <b>{isPaid ? "PAID" : "NOT PAID"}</b>
                </p>
              </div>

              <div className="mt-4">
                <h2 className={`text-lg text-gray-400 font-semibold font-palanquin`}>
                  Order Status:
                </h2>
                <hr className=" border-slate-900 w-32" />
                <p
                  className={
                    orderStatus && orderStatus.includes("Delivered")
                      ? "text-green-600"
                      : "text-red-600"
                  }
                >
                  <b className="font-palanquin">{orderStatus}</b>
                </p>
              </div>
            </div>
          </div>

          <div>
            <h4 className={`text-lg text-gray-400 font-bold mb-1 font-palanquin`}>
              Order Status
            </h4>
            <div className="flex text-stone-900 items-center  font-semibold">
              <select
                className={`form-select light-mode-select rounded px-4 py-3 `}
                onChange={(e) => setOrderStatus(e.target.value)}
                value={orderStatus}
                name="status"
              >
                <option value="Processing">Processing</option>
                <option value="Shipped">Shipped</option>
                <option value="Delivered">Delivered</option>
              </select>
              <button
                disabled={loading}
                onClick={submitHandler}
                className={`w-2/5 mx-auto py-3 bg-gradient-to-b from-black to-slate-700 via-slate-900 text-white font-bold rounded hover:scale-105 duration-300 focus:outline-none`}
              >
                Update Status
              </button>
            </div>
          </div>

          <div>
            <h2 className={`text-lg text-gray-400 font-semibold font-palanquin`}>
              Order Items:
            </h2>
            <hr className=" border-black w-28" />
            <div className="grid grid-cols-3 md:grid-cols-1 lg:grid-cols-3 sm:grid-cols-1 gap-2 ">
              {orderItems.map((item) => (
                <div className="my-4" key={item._id}>
                  <div className="flex flex-col md:flex-row items-center">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-36 h-20 object-cover lg:w-28 lg:h-20 sm:w-20 sm:h-16 -rotate-6 hover:rotate-45 duration-500 transform origin-center"
                      />
                    <div className="ml-4">
                      <Link
                        to={`/product/${item.product}`}
                        className={`text-stone-950 font-semibold hover:text-yellow-700 no-underline`}
                      >
                        {item.name}
                      </Link>
                      <p>
                        ${" "}
                        <span className="text-coral-red font-bold">
                          {item.price}
                        </span>
                      </p>
                      <p>{item.quantity} Piece(s)</p>
                    </div>{" "}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
