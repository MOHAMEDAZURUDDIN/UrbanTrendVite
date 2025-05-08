import React from "react";
import { SiShopify } from "react-icons/si";
import { TiShoppingCart } from "react-icons/ti";
import { BiSolidUserAccount } from "react-icons/bi";
import { RiShoppingBasketLine } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";

const Sidebar = () => {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.authState);
  const { items:cartItems } = useSelector((state) => state.cartState);

  const links = [
    {
      id: 1,
      child: (
        <>
          <BiSolidUserAccount size={30} />
        </>
      ),
      href: isAuthenticated ? "/myprofile" : "/login",
    },
    {
      id: 2,
      child: (
        <>
          <SiShopify size={30} />
        </>
      ),
      href: "/",
    },
    {
      id: 3,
      child: (
        <>
          <TiShoppingCart size={30} />
          <p
            className=" bg-white text-black text-xs w-4 h-4 mr-6 rounded-full flex items-center justify-center font-semibold"
            id="cart_count"
          >
            {cartItems.length}
          </p>
          Cart 👈🏻
        </>
      ),
      href: "/cart",
    },
    {
      id: 4,
      child: (
        <>
          <RiShoppingBasketLine size={30} />
        </>
      ),
      href: "/orders",
    },
  ];

  return (
    <div className="flex-col top-[35%] opacity-100 z-20 right-0 fixed lg:flex">
      <ul>
        {links.map((link) => (
          <li
            key={link.id}
            className={`flex justify-between items-center w-40 h-14 px-4 mr-[-100px] hover:rotate-12 hover:bg-yellow-700 hover:rounded-md duration-300 bg-yellow-500`}
          >
            <a
              href={link.href ? link.href : "/"}
              className="flex justify-between items-center w-full font-semibold text-black"
              target="_blank"
              rel="noreferrer"
            >
              {link.child}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
