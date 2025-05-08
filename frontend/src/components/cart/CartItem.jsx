import React from "react";
import { MinusIcon, PlusIcon, TrashIcon } from "@heroicons/react/24/outline";
import { useDispatch } from "react-redux";
import {
  decreaseCartItemQty,
  increaseCartItemQty,
  removeItemFromCart,
} from "../../slices/cartSlice";

const CartItem = ({ item }) => {
  const dispatch = useDispatch();

  const onRemoveItem = () => {
    dispatch(removeItemFromCart(item.product));
  };

  const onIncreaseItemQty = () => {
    const count = item.quantity;
    if (item.stock === 0 || count >= item.stock) return;
    dispatch(increaseCartItemQty(item.product));
  };

  const onDecreaseItemQty = () => {
    const count = item.quantity;
    if (count === 1) return;
    dispatch(decreaseCartItemQty(item.product));
  };

  return (
    <div className="flex items-center justify-between w-full  bg-slate-300 ">
      <div className="flex items-center gap-4">
        <div
          className={`bg-${item.color} shadow-lg shadow-${item.shadow} relative rounded p-1 hover:scale-105 transition-all duration-300 ease-in-out grid items-center `}
        >
          <img
            src={item.image}
            alt={`${item.name} product`}
            className="w-36 h-20 object-cover lg:w-28 lg:h-20 sm:w-20 sm:h-16 -rotate-6 hover:rotate-45 duration-500 transform origin-center"
          />
          <div className="absolute right-1 top-1 blur-theme-effect bg-white/80 text-black rounded px-1 text-xs">
            ${item.price}
          </div>
        </div>
        <div className="grid items-center justify-center ">
          <h1 className="font-medium text-lg text-slate-900 lg:text-base">
            {item.name}
          </h1>
          <p className="text-sm text-slate-800 lg:text-xs">
            {item.description}
          </p>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={onDecreaseItemQty}
            className="bg-theme-cart rounded w-8 h-8 lg:w-6 lg:h-6 flex items-center justify-center active:scale-90 hover:bg-theme-cart-dark transition-all duration-200"
          >
            <MinusIcon className="w-6 h-6 lg:w-4 lg:h-4 text-white stroke-[2]" />
          </button>
          <div className="bg-theme-cart rounded w-8 h-8 lg:w-6 lg:h-6 flex items-center justify-center text-slate-400">
            {item.quantity}
          </div>
          <button
            type="button"
            onClick={onIncreaseItemQty}
            className="bg-theme-cart rounded w-8 h-8 lg:w-6 lg:h-6 flex items-center justify-center active:scale-90 hover:bg-theme-cart-dark transition-all duration-200"
          >
            <PlusIcon className="w-6 h-6 lg:w-4 lg:h-4 text-white stroke-[2]" />
          </button>
        </div>
        <div className="flex items-center gap-4">
          <h1 className="text-lg lg:text-base text-slate-900 font-medium">
            ${item.price * item.quantity}
          </h1>
          <button
            type="button"
            className="bg-theme-cart rounded p-1 lg:p-0.5 grid items-center justify-items-center cursor-pointer hover:bg-theme-cart-dark transition-all duration-200"
            onClick={onRemoveItem}
          >
            <TrashIcon className="w-6 h-6 text-white" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
