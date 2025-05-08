import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { clearAuthError, forgotPassword } from "../../actions/userActions";
import MetaData from "../layouts/MetaData";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();
  const { error, message } = useSelector((state) => state.authState);

  const submitHandler = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("email", email);
    dispatch(forgotPassword(formData));
  };

  useEffect(() => {
    if (message) {
      toast(message, {
        type: "success",
        position: toast.POSITION.BOTTOM_CENTER,
      });
      setEmail("");
      return;
    }

    if (error) {
      toast(error, {
        position: toast.POSITION.BOTTOM_CENTER,
        type: "error",
        onOpen: () => {
          dispatch(clearAuthError);
        },
      });
      return;
    }
  }, [message, error, dispatch]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-900 via-cyan-800 to-blue-900">
      <div className="w-96 sm:w-80 bg-slate-900 overflow-hidden bg-cover bg-center rounded-2xl shadow-2xl">
        <MetaData title={`ForgotPassword`} />
        <div className="bg-slate-900 p-3 shadow-sm shadow-teal-600 mb-2">
          <h1 className="font-montserrat text-3xl font-bold mb-1 text-center text-white-400">
            <span className="text-red-600">Forgot</span> Password
          </h1>
        </div>

        <form
          onSubmit={submitHandler}
          className="w-full max-w-md px-4 py-2 mb-4"
        >
          <div className="mb-4">
            <label
              htmlFor="email_field"
              className="block mb-1 font-medium text-pale-blue"
            >
              Enter Email
            </label>
            <input
              type="text"
              id="email_field"
              className="mt-1 p-2 w-full bg-gray-300 text-stone-900 rounded border border-blue-950"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="flex justify-center">
            <button
              id="forgot_password_button"
              type="submit"
              className="w-full py-3 bg-gradient-to-tl from-red-800 via-rose-900 to-rose-950 text-white font-bold rounded hover:to-red-700 hover:scale-105 duration-300 focus:outline-none"
              onClick={submitHandler}
            >
              Send Email
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
