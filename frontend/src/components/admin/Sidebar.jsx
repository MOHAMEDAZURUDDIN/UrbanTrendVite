import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  FiHome,
  FiShoppingCart,
  FiUsers,
  FiStar,
  FiBox,
  FiShoppingBag,
  FiPlus,
} from "react-icons/fi";

export default function Sidebar() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleDropdownToggle = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className="bg-gray-800  w-64 xl:w-44 sm:w-32 lg:w-36 text-white font-bold rounded">
      <nav id="sidebar">
        <ul className="list-none mt-6 xl:mt-4 lg:mt-3 md:mt-2 sm:mt-1 p-4 sm:p-0 md:p-8">
          <li className="flex items-center">
            <Link
              to="/admin/dashboard"
              className="flex items-center px-4 xl:px-2 lg:px-0 md:gap-1 sm:px-1 py-2 hover:text-blue-500 hover:no-underline"
            >
              <FiHome className="mr-2 sm:mr-0" /> Dashboard
            </Link>
          </li>

          <li>
            <Link
              to="/admin/orders"
              className="flex items-center px-4 xl:px-2 lg:px-0 sm:p-1 py-2 hover:text-coral-red hover:no-underline"
            >
              <FiShoppingCart className="mr-2" /> Orders
            </Link>
          </li>

          <li>
            <Link
              to="/admin/users"
              className="flex items-center px-4 xl:px-2 sm:p-1 py-2 hover:text-yellow-400 hover:no-underline"
            >
              <FiUsers className="mr-2" /> Users
            </Link>
          </li>

          <li>
            <Link
              to="/admin/reviews"
              className="flex items-center px-4 xl:px-2 sm:p-1 py-2 hover:text-orange-500 hover:no-underline"
            >
              <FiStar className="mr-2" /> Reviews
            </Link>
          </li>

          <li>
            <button
              onClick={handleDropdownToggle}
              className="flex items-center w-full text-left px-4 xl:px-2 sm:p-1 py-2 hover:text-purple-400 focus:outline-none"
            >
              <FiBox className="mr-2" /> Product
            </button>

            {isDropdownOpen && (
              <ul className="absolute mt-2 text-gray-800 font-semibold">
                <li>
                  <Link
                    to="/admin/products"
                    className="block px-4 py-2 bg-red-500 hover:text-white hover:no-underline rounded"
                  >
                    <FiShoppingBag className="mr-2" /> All
                  </Link>
                </li>
                <li>
                  <Link
                    to="/admin/products/create"
                    className="block px-4 py-2 mt-1 bg-yellow-500 hover:text-white hover:no-underline rounded"
                  >
                    <FiPlus className="mr-2" /> Create
                  </Link>
                </li>
              </ul>
            )}
          </li>
        </ul>
      </nav>
    </div>
  );
}
