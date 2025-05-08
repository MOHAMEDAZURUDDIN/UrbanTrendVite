import React, { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { useSelector } from "react-redux";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const darkMode = useSelector((state) => state.darkmode);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name) {
      newErrors.name = "Name is required";
    }

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!validateEmail(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    if (!formData.message) {
      newErrors.message = "Message is required";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const validateEmail = (email) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const response = await axios.post("/api/v1/contact", formData);
        if (response.status === 200) {
          toast.success("Message sent successfully", {
            position: toast.POSITION.BOTTOM_CENTER,
          });
          setFormData({
            name: "",
            email: "",
            message: "",
          });
        }
      } catch (error) {
        toast.error("An error occurred while sending the email", {
          position: toast.POSITION.BOTTOM_CENTER,
        });
      }
    }
  };

  const [errors, setErrors] = useState({});

  return (
    <div className={`bg-white font-montserrat p-4 `}>
      <div className="max-w-md mx-auto bg-slate-900 rounded-md">
        <div className="bg-slate-900 p-3 shadow-sm shadow-teal-600 mb-2 rounded-xl">
          <h1 className="font-montserrat text-3xl text-red-600 font-bold text-center ">
            Contact <span className="text-white-400">Us</span>
          </h1>
        </div>
        <form
          onSubmit={handleSubmit}
          className="p-4 bg-slate-800 rounded-md shadow-md"
        >
          <div className="mb-2">
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none"
              required
            />
            {errors.name && <p className="text-red-500">{errors.name}</p>}
          </div>
          <div className="mb-2">
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none"
              required
            />
            {errors.email && <p className="text-red-500">{errors.email}</p>}
          </div>
          <div className="mb-2">
            <textarea
              name="message"
              placeholder="Message"
              value={formData.message}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none"
              rows="4"
              required
            />
            {errors.message && <p className="text-red-500">{errors.message}</p>}
          </div>
          <div className="text-center">
            <button
              type="submit"
              className="w-full p-2 bg-blue-500 text-white font-bold rounded-md hover:bg-blue-600 focus:outline-none"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Contact;
