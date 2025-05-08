import React, { useEffect, useState } from "react";
import MetaData from "../layouts/MetaData";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { clearAuthError, login } from "../../actions/userActions";
import { toast } from "react-toastify";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const { loading, error, isAuthenticated } = useSelector(
    (state) => state.authState
  );

  const redirect = location.search ? "/" + location.search.split("=")[1] : "/";

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigate(redirect);
    }

    if (error) {
      toast(error, {
        position: toast.POSITION.BOTTOM_CENTER,
        type: "error",
        onOpen: () => {
          dispatch(clearAuthError);
        },
      });
    }
  }, [error, isAuthenticated, dispatch, navigate, redirect]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-900 via-cyan-800 to-blue-900">
      <div className="w-96 sm:w-80  bg-slate-900 overflow-hidden bg-cover bg-center rounded-2xl shadow-2xl">
        <MetaData title={`Login`} />
        <div className="bg-slate-900 p-3 shadow-sm shadow-teal-600 mb-2">
          <h1 className="font-montserrat text-3xl text-white-400 font-bold text-center ">
            Log<span className="text-red-600">in</span>
          </h1>
        </div>
        <form
          onSubmit={submitHandler}
          className="w-full max-w-md px-4 scroll-py-4 mt-4"
        >
          <input
            type="email"
            id="email_field"
            placeholder="Email"
            className="w-full h-12 bg-gray-300 px-4 rounded mb-3"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            name="pswd"
            placeholder="Password"
            className="w-full h-12 bg-gray-300 px-4 rounded "
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="flex justify-start w-full mb-2">
            <Link
              to="/password/forgot"
              className="block mt-2 text-red-500 font-semibold hover:no-underline"
            >
              Forgot Password
            </Link>
          </div>
          <button
            id="login_button"
            type="submit"
            className="w-full mb-3 py-3  bg-gradient-to-br from-red-600 to-white-400 via-rose-600 text-white 
            font-bold rounded  shadow hover:shadow-blue-500 hover:scale-105 duration-300  focus:outline-none"
            disabled={loading}
          >
            LOGIN
          </button>
          <div className="flex justify-end w-full mb-2">
            <Link
              to="/register"
              className="block mt-2 text-yellow-500 font-semibold hover:no-underline"
            >
              New User?
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
