import React, { useEffect, useState } from "react";
import MetaData from "../layouts/MetaData";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearAuthError, register } from "../../actions/userActions";
import { toast } from "react-toastify";
import DefImg from "../../assets/default_avatar.png";
const Register = () => {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [avatar, setAvatar] = useState("");
  const [avatarPreview, setAvatarPreview] = useState(DefImg);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error, isAuthenticated } = useSelector(
    (state) => state.authState
  );

  const onChange = (e) => {
    if (e.target.name === "avatar") {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setAvatarPreview(reader.result);
          setAvatar(e.target.files[0]);
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    } else {
      setUserData({ ...userData, [e.target.name]: e.target.value });
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", userData.name);
    formData.append("email", userData.email);
    formData.append("password", userData.password);
    formData.append("avatar", avatar);
    dispatch(register(formData));
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
      return;
    }
    if (error) {
      toast.error(error, {
        position: toast.POSITION.BOTTOM_CENTER,
        onOpen: () => {
          dispatch(clearAuthError);
        },
      });
    }
  }, [dispatch, isAuthenticated, navigate, error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-900 via-cyan-800 to-blue-900">
      <div className="w-96 sm:w-80 h-96 bg-slate-900 overflow-hidden bg-cover bg-center rounded-2xl shadow-2xl">
        <MetaData title={`Register`} />
        <div className="bg-slate-900 p-3 shadow-sm shadow-teal-600 mb-4">
          <h1 className="font-montserrat text-3xl text-white-400 font-bold text-center">
            Reg<span className="text-red-600">i</span>ster
          </h1>
        </div>
        <div className="mt-2">
          <div className="relative h-full flex flex-col justify-center items-center">
            <form
              onSubmit={submitHandler}
              className="w-full max-w-md px-4 scroll-py-4"
              encType="multipart/form-data"
            >
              <input
                name="name"
                type="text"
                placeholder="Name"
                className="w-full h-12 bg-gray-300 px-4 rounded mb-3"
                value={userData.name}
                onChange={onChange}
              />
              <input
                name="email"
                type="email"
                placeholder="Email"
                className="w-full h-12 bg-gray-300 px-4 rounded mb-3"
                value={userData.email}
                onChange={onChange}
              />
              <input
                name="password"
                type="password"
                placeholder="Password"
                className="w-full h-12 bg-gray-300 px-4 rounded mb-3"
                value={userData.password}
                onChange={onChange}
              />
              <div className="flex items-center ">
                <div className="w-16 h-14 mr-3">
                  <figure className="avatar">
                    <img
                      src={avatarPreview}
                      alt="Avatar"
                      className="rounded-lg w-28 h-12"
                    />
                  </figure>
                </div>
                <div className="w-full flex flex-col">
                  <div className="relative flex-1">
                    <input
                      type="file"
                      name="avatar"
                      onChange={onChange}
                      className="hidden"
                      id="customFile"
                    />
                    <div className="flex justify-start">
                      <label
                        className="p-2 w-full  mb-2 bg-gradient-to-tl from-lime-500 to-green-950 via-green-500 text-pale-blue font-semibold rounded-lg text-center cursor-pointer"
                        htmlFor="customFile"
                      >
                        <span className="p-1 bg-white-400 text-black rounded ">
                          Choose Avatar
                        </span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              <button
                id="register_button"
                type="submit"
                className="w-full mb-3 py-3 bg-gradient-to-br from-cyan-700 to-cyan-600 via-sky-900 hover:from-sky-500 text-white font-bold rounded shadow-md hover:shadow-blue-500 hover:scale-105 duration-300 focus:outline-none"
                disabled={loading}
              >
                REGISTER
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
