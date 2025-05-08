import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { countries } from "countries-list";
import { saveShippingInfo } from "../../slices/cartSlice";
import { useNavigate } from "react-router-dom";
import CheckoutSteps from "./CheckoutStep";
import { toast } from "react-toastify";
import MetaData from "../layouts/MetaData";

export const validateShipping = (shippingInfo, navigate) => {
  if (
    !shippingInfo.address ||
    !shippingInfo.city ||
    !shippingInfo.state ||
    !shippingInfo.country ||
    !shippingInfo.phoneNo ||
    !shippingInfo.postalCode
  ) {
    toast.error("Please fill in the shipping information", {
      position: toast.POSITION.BOTTOM_CENTER,
    });
    navigate("/shipping");
  }
};

const Shipping = () => {
  const { shippingInfo = {} } = useSelector((state) => state.cartState);
  const [address, setAddress] = useState(shippingInfo.address || "");
  const [city, setCity] = useState(shippingInfo.city || "");
  const [phoneNo, setPhoneNo] = useState(shippingInfo.phoneNo || "");
  const [postalCode, setPostalCode] = useState(shippingInfo.postalCode || "");
  const [country, setCountry] = useState(shippingInfo.country || "");
  const [state, setState] = useState(shippingInfo.state || "");
  const countryList = Object.values(countries);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  console.log('shp:',shippingInfo);
  const submitHandler = (e) => {
    e.preventDefault();
    if (country !== "United States") {
      toast.error("Please select USA as the country.", {
        position: toast.POSITION.BOTTOM_CENTER,
      });
      return;
    }
    dispatch(
      saveShippingInfo({ address, city, phoneNo, postalCode, country, state })
    );
    navigate("/order/confirm");
  };

  return (
    <>
      <div className="bg-black clip-path h-[65vh] lg:h-[75vh] md:h-[45vh] sm:h-[25vh] w-auto absolute top-0 left-0 right-0 opacity-90 z-10 "></div>
      <div className="relative opacity-100 z-20 min-h-screen flex flex-col ">
        <MetaData title={"Shipping Info"} />
        <div className="mt-20">
          <CheckoutSteps shipping />
        </div>

        <div className=" max-w-md w-full sm:px-4 mx-auto bg-slate-300 p-8 rounded-md shadow-md ">
          <div className="text-3xl mb-6 font-bold text-gray-800 text-center font-palanquin">
            <span className="text-rose-800">Shipping</span> Information
          </div>
          <form onSubmit={submitHandler} className="space-y-4">
            <input
              type="text"
              placeholder="Name"
              className="p-3 w-full bg-gray-200 rounded-md border-none"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />

            <input
              type="text"
              placeholder="City"
              className="p-3 w-full bg-gray-200 rounded-md border-none"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              required
            />

            <input
              type="phone"
              placeholder="Phone Number"
              className="p-3 w-full bg-gray-200 rounded-md border-none"
              value={phoneNo}
              onChange={(e) => setPhoneNo(e.target.value)}
              required
            />

            <input
              type="number"
              placeholder="Postal Code"
              className="p-3 w-full bg-gray-200 rounded-md border-none"
              value={postalCode}
              onChange={(e) => setPostalCode(e.target.value)}
              required
            />

            <input
              type="text"
              placeholder="State"
              className="p-3 w-full bg-gray-200 rounded-md border-none"
              value={state}
              onChange={(e) => setState(e.target.value)}
              required
            />

            <select
              placeholder="Country"
              className="p-3 w-full bg-gray-200 rounded-md border-none"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              required
            >
              {countryList.map((country, i) => (
                <option key={i} value={country.name}>
                  {country.name}
                </option>
              ))}
            </select>

            <button
              type="submit"
              className="w-full py-3 bg-gradient-to-tl from-green-500 to-lime-600 via-green-900 text-white font-bold rounded-md shadow-md hover:shadow-blue-500 hover:scale-105 duration-300 focus:outline-none"
            >
              CONTINUE
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Shipping;
