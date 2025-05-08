import React from "react";
import { Link } from "react-router-dom";

const DashboardItem = ({ title, value, link, bgColor }) => {
  const containerStyle = {
    backgroundColor: bgColor || "bg-gray-800",
  };
  return (
    <div
      className={`flex flex-col  items-center w-full md:h-44  p-8 rounded-lg shadow-md  ${containerStyle.backgroundColor}`}
    >
      <div className="text-xl font-semibold text-gray-800">{title}</div>
      <div className="mt-4 text-4xl font-bold">{value}</div>
      {link && (
        <Link to={link} className="mt-2 text-blue-500 hover:underline">
          <button className="bg-slate-800 p-2 rounded text-pale-blue md:h-10">
            View Details <i className="fa fa-angle-right ml-1 text-red-500"></i>
          </button>
        </Link>
      )}
    </div>
  );
};

export default DashboardItem;
