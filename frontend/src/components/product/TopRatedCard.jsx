import React from "react";

import { StarIcon } from "@heroicons/react/24/solid";
import { useNavigate } from "react-router-dom";

const TopRatedCard = ({ product, index }) => {
  const navigate = useNavigate();
  const {
    name,
    description,
    ratings,
    numOfReviews,
    price,
    images,
    color,
  } = product;

  const handleClick = (productId) => {
    navigate(`/products/${productId}`);
  };

  return (
    <div
      className={`bg-${color} shadow-lg shadow-black relative py-4 px-6 lg:px-4 transition-all duration-500 ease-in-out w-full hover:scale-105 rounded-md `}
    >
      <div className="grid items-center justify-items-start">
        <h1 className="text-gray-300 text-xl lg:text-lg md:text-base font-semibold">
          {name}
        </h1>
        <p className="text-white text-base font-normal">{description}</p>
        <div className="flex items-center gap-1">
          <StarIcon className="icon-style w-5 h-5 md:w-4 md:h-4 text-yellow-300" />
          <h1 className="md:text-sm font-normal text-white">
            {ratings} ({numOfReviews} reviews)
          </h1>
        </div>
        <div className="flex items-center gap-3 mt-2">
          <div className="flex items-center bg-white/80 px-2 py-1 rounded shadow-md">
            <span className="text-black text-sm font-medium">${price}</span>
          </div>
          <button
            onClick={() => handleClick(product._id)}
            className="bg-gradient-to-b from-blue-500 to-blue-700 text-white px-2 py-2 rounded shadow-md hover:bg-blue-600 transition-all duration-300 ease-in-out"
          >
            View Details
          </button>
        </div>
      </div>
      {images && images[0] && (
        <div className="flex items-center justify-end absolute top-2 right-2">
          <img
            src={images[0].image}
            alt={name}
            className="transitions-theme -rotate-45 hover:rotate-45 h-28 w-40 object-cover rounded-md"
          />
        </div>
      )}
    </div>
  );
};

export default TopRatedCard;
