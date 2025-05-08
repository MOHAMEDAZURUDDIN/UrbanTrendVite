import React from "react";
import { Link } from "react-router-dom";

const CheckoutSteps = ({ shipping, confirmOrder, payment }) => {
  return (
    <div className="flex justify-center items-center space-x-4 text-gray-500 mb-4 font-palanquin font-bold text-2xl sm:text-xs">
      <div className={`flex items-center space-x-2 ${shipping && "text-rose-500 font-bold"}`}>
        <span>Shipping</span>
        {shipping && <span>&gt;</span>}
      </div>
      <div className={`flex items-center space-x-2 ${confirmOrder && "text-rose-500 font-bold"}`}>
        {shipping ? <Link to="/order/confirm">Confirm Order</Link> : <span>Confirm Order</span>}
        {confirmOrder && <span>&gt;</span>}
      </div>
      <div className={`flex items-center space-x-2 ${payment && "text-rose-500 font-bold"}`}>
        {confirmOrder ? <Link to="/payment">Payment</Link> : <span>Payment</span>}
      </div>
    </div>
  );
};

export default CheckoutSteps;
