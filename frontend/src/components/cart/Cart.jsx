import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import CartCount from "./CartCount";
import CartItem from "./CartItem";
import CartEmpty from "./CartEmpty";
import { removeItemFromCart } from "../../slices/cartSlice";

const Cart = () => {
  const { items } = useSelector((state) => state.cartState);
  // console.log('oem:',items);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const checkoutHandler = () => {
    navigate("/login?redirect=shipping");
  };

  const onClearCartItems = () => {
    dispatch(removeItemFromCart());
  };

  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 blur-effect-theme w-full h-screen opacity-100 z-[200] visible translate-x-0">
      <div className="blur-effect-theme h-screen max-w-2xl w-full absolute right-0">
        <CartCount
          onClearCartItems={onClearCartItems}
          totalQTY={items.length}
        />
        {items.length === 0 ? (
          <CartEmpty />
        ) : (
          <div>
            <div className="flex items-start justify-start flex-col gap-y-6 lg:gap-y-4 overflow-y-scroll h-[81vh] scroll-smooth scroll-hidden py-3">
              {items.map((item, i) => (
                <CartItem key={i} item={item} />
              ))}
            </div>
            <div className="fixed bottom-0 bg-white w-full px-5 py-2 grid items-center ">
              <div className="flex items-center justify-between ">
                <h1 className="text-base font-semibold uppercase">SubTotal</h1>
                <h1 className="text-sm rounded bg-theme-cart text-slate-100 px-1 py-0.5">
                  $
                  {items.reduce(
                    (total, item) => total + item.price * item.quantity,
                    0
                  )}
                </h1>
              </div>
              <div className="grid items-center gap-2">
                <p className="text-sm font-medium text-center">
                  Taxes and Shipping Will Calculate At Shipping
                </p>
                <button
                  type="button"
                  onClick={checkoutHandler}
                  className="button-theme bg-theme-cart text-white py-2"
                >
                  Check Out
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
