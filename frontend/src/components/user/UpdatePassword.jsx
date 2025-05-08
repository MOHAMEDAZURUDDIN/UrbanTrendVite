import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  updatePassword as updatePasswordAction,
  clearAuthError,
} from "../../actions/userActions";
import MetaData from "../layouts/MetaData";

export default function UpdatePassword() {
  const [password, setPassword] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const dispatch = useDispatch();
  const { isUpdated, error, loading } = useSelector((state) => state.authState);

  const submitHandler = (e) => {
    e.preventDefault();
    if (!oldPassword.trim() || !password.trim()) {
      toast("Please enter both old and new passwords", {
        type: "error",
        position: toast.POSITION.BOTTOM_CENTER,
      });
      return;
    }
    const formData = new FormData();
    formData.append("oldPassword", oldPassword);
    formData.append("password", password);
    dispatch(updatePasswordAction(formData));
  };

  useEffect(() => {
    if (isUpdated) {
      toast("Password updated successfully", {
        type: "success",
        position: toast.POSITION.BOTTOM_CENTER,
      });
      setOldPassword("");
      setPassword("");
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
  }, [isUpdated, error, dispatch]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950">
      <div className="w-96 sm:w-80 bg-slate-900 overflow-hidden bg-cover bg-center rounded-2xl shadow-2xl">
        <MetaData title={`Update_password`} />
        <div className="bg-slate-900 p-3 shadow-sm shadow-teal-600 mb-4">
          <h1 className="mb-3 text-3xl font-bold text-center text-white">
            Update<span className="text-coral-red"> Password</span>
          </h1>
        </div>
        <div className="relative h-full flex flex-col justify-center items-center">
          <form
            className="w-full max-w-md px-4 py-2 space-y-4"
            onSubmit={submitHandler}
          >
            <div>
              <input
                type="password"
                id="old_password_field"
                placeholder="Old Password"
                className="mt-1 p-2 w-full bg-gray-700 text-white rounded border border-blue-950"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
              />
            </div>

            <div>
              <input
                type="password"
                id="new_password_field"
                placeholder="New Password"
                className="mt-1 p-2 w-full bg-gray-700 text-white rounded border border-blue-950"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button
              type="submit"
              className={`w-full mb-3 py-3 bg-gradient-to-tl from-rose-950 via-slate-950  text-white font-bold rounded shadow-md hover:shadow-blue-500 hover:scale-105 duration-300 focus:outline-none ${
                loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={loading}
            >
              {loading ? "Password Updating..." : "Update Password"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
