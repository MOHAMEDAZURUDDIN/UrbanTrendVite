import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { resetPassword, clearAuthError } from "../../actions/userActions";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import MetaData from "../layouts/MetaData";

export default function ResetPassword() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const dispatch = useDispatch();
  const { isAuthenticated, error } = useSelector((state) => state.authState);
  const navigate = useNavigate();
  const { token } = useParams();

  const submitHandler = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("password", password);
    formData.append("confirmPassword", confirmPassword);

    dispatch(resetPassword(formData, token));
  };

  useEffect(() => {
    if (isAuthenticated) {
      toast("Password Reset Success!", {
        type: "success",
        position: toast.POSITION.BOTTOM_CENTER,
      });
      navigate("/");
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
  }, [isAuthenticated, error, dispatch, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-900 via-cyan-800 to-blue-900">
      <div className="w-96 sm:w-80 bg-slate-900 overflow-hidden bg-cover bg-center rounded-2xl shadow-2xl">
        <MetaData title={`ResetPassword`} />
        <div className="bg-slate-900 p-1 shadow-sm shadow-teal-600 mb-2">
          <h1 className="font-montserrat text-3xl font-bold mb-3 text-center text-yellow-400">
            <span className="text-red-600">New</span>Password
          </h1>
        </div>

        <form
          onSubmit={submitHandler}
          className="w-full max-w-md px-4 py-2 mb-4"
        >
          <div className="mb-4">
            <label
              htmlFor="password_field"
              className="block mb-1 font-medium text-pale-blue"
            >
              Password
            </label>
            <input
              type="password"
              id="password_field"
              className="mt-1 p-2 w-full bg-gray-300 text-stone-900 rounded border border-blue-950"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="confirm_password_field"
              className="block mb-1 font-medium text-pale-blue"
            >
              Confirm Password
            </label>
            <input
              type="password"
              id="confirm_password_field"
              className="mt-1 p-2 w-full bg-gray-300 text-stone-900 rounded border border-blue-950"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          <div className="flex justify-center">
            <button
              id="new_password_button"
              type="submit"
              className="w-full py-3 bg-gradient-to-tl from-stone-900 to-blue-600 via-indigo-950 text-white font-bold rounded hover:from-indigo-700 hover:scale-105 duration-300 focus:outline-none"
            >
              Set Password
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
