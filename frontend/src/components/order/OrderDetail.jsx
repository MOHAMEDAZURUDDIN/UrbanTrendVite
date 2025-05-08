import { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import Loader from "../layouts/Loader";
import { orderDetail as orderDetailAction } from "../../actions/orderActions";

export default function OrderDetail() {
  const { orderDetail, loading } = useSelector((state) => state.orderState);

  const {
    shippingInfo = {},
    user = {},
    orderStatus = "Processing",
    orderItems = [],
    totalPrice = 0,
    paymentInfo = {},
  } = orderDetail;
  const isPaid =
    paymentInfo && paymentInfo.status === "succeeded" ? true : false;
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    dispatch(orderDetailAction(id));
  }, [id, dispatch]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="bg-black clip-path h-[95vh] lg:h-[65vh] md:h-[55vh] sm:h-[65vh] w-auto absolute top-0 left-0 right-0 opacity-90 z-10"></div>

          <div
            className={`mt-24 relative opacity-100 z-20 text-white-400 min-h-screen font-montserrat px-4 py-2 overflow-x-auto`}
          >
            <h1
              className={`text-2xl font-semibold text-white mb-4 text-center`}
            >
              <span className="text-blue-500">Order #</span> {orderDetail._id}
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ">
              <div>
                <div className="mb-4 ">
                  <h2
                    className={`text-xl text-blue-500 font-semibold font-palanquin`}
                  >
                    Shipping Info
                  </h2>
                  <hr className=" border-y-lime-400 w-32" />

                  <p className="mb-1">
                    <b>Name:</b>{" "}
                    <span className={`text-gray-300`}>{user.name}</span>
                  </p>
                  <p className="mb-1">
                    <b>Phone:</b>{" "}
                    <span className={`text-gray-300`}>
                      {shippingInfo.phoneNo}
                    </span>
                  </p>
                  <p className="mb-1">
                    <b>Address:</b>{" "}
                    <span className={`text-gray-300`}>
                      {shippingInfo.address},{shippingInfo.city},
                      {shippingInfo.postalCode},{shippingInfo.state},
                      {shippingInfo.country}
                    </span>
                  </p>

                  <div className="mt-8">
                    <h2
                      className={`text-xl text-blue-500 font-semibold  font-palanquin`}
                    >
                      Payment
                    </h2>
                    <hr className=" border-y-lime-400 w-20" />

                    <p className="mt-2">
                      <b className="text-slate-900">Amount:</b> $
                      <span className="text-coral-red font-bold">
                        {totalPrice}
                      </span>
                    </p>
                    <p className={isPaid ? "text-green-600" : "text-red-600"}>
                      <b>{isPaid ? "PAID" : "NOT PAID"}</b>
                    </p>
                  </div>

                  <div className="mt-4">
                    <h2
                      className={`text-xl text-blue-500 font-semibold font-palanquin`}
                    >
                      Order Status:
                    </h2>
                    <hr className=" border-black w-28" />

                    <p
                      className={
                        orderStatus && orderStatus.includes("Delivered")
                          ? "text-green-600"
                          : "text-red-600"
                      }
                    >
                      <b>{orderStatus}</b>
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <h2
                  className={`text-xl text-black font-semibold font-palanquin`}
                >
                  Order Items:
                </h2>
                <hr className=" border-black w-28" />
                <div className="grid grid-cols-2 md:grid-cols-1 lg:grid-cols-2 sm:grid-cols-1 gap-2 ">
                  {orderItems.map((item) => (
                    <div className="my-4" key={item._id}>
                      <div className="flex items-center text-slate-800">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-36 h-20 object-cover lg:w-28 lg:h-20 sm:w-20 sm:h-16 -rotate-6 hover:rotate-45 duration-500 transform origin-center"
                        />
                        <div className="ml-4">
                          <div
                            className={`text-slate-900 font-semibold no-underline`}
                          >
                            {item.name}
                          </div>
                          <p>
                            ${" "}
                            <span className="text-coral-red font-bold">
                              {item.price}
                            </span>
                          </p>
                          <p>{item.quantity} Piece(s)</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </Fragment>
  );
}
