import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { updateProfile, clearAuthError } from "../../actions/userActions";
import { clearUpdateProfile } from "../../slices/authSlice";
import MetaData from "../layouts/MetaData";

export default function UpdateProfile() {
  const { loading, error, user, isUpdated } = useSelector(
    (state) => state.authState
  );
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [avatar, setAvatar] = useState("");
  const [avatarPreview, setAvatarPreview] = useState(
    "/images/default_avatar.png"
  );
  const dispatch = useDispatch();
  const [change, setChange] = useState(false);

  const onChangeAvatar = (e) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setAvatarPreview(reader.result);
        setAvatar(e.target.files[0]);
      }
    };

    reader.readAsDataURL(e.target.files[0]);
    setChange(true);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("avatar", avatar);
    dispatch(updateProfile(formData));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (value !== user[name]) {
      setChange(true);
    } else {
      setChange(false);
    }
  };
  
  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      if (user.avatar) {
        setAvatarPreview(user.avatar);
      }
    }

    if (isUpdated) {
      toast("Profile updated successfully", {
        type: "success",
        position: toast.POSITION.BOTTOM_CENTER,
        onOpen: () => dispatch(clearUpdateProfile()),
      });
      setChange(false);
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
  }, [user, isUpdated, error, dispatch]);

  return (
    <div className="bg-slate-950 min-h-screen flex items-center justify-center ">
      <div className="w-96 sm:w-80 bg-slate-900 overflow-hidden bg-cover bg-center rounded-2xl shadow-2xl">
        <MetaData title={`Update_Profile`} />
        <div className="bg-slate-900 p-3 shadow-sm shadow-teal-600 mb-4">
          <h1 className="font-montserrat text-3xl text-white-400 font-bold text-center">
            Update <span className="text-red-600">Your</span> Profile
          </h1>
        </div>
        <div className="mt2">
          <div className="relative h-full flex flex-col justify-center items-center">
            <form
              className="w-full max-w-md px-4 py-2 space-y-4"
              onSubmit={submitHandler}
              encType="multipart/form-data"
            >
              <div>
                <label
                  htmlFor="name_field"
                  className="block mb-1 font-medium text-white-400"
                >
                  Your Full Name
                </label>
                <input
                  type="text"
                  id="name_field"
                  name="name"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    handleInputChange(e);
                  }}
                  className="mt-1 p-2 w-full bg-gray-700 text-white rounded border border-blue-950"
                />
              </div>

              <div>
                <label
                  htmlFor="email_field"
                  className="block mb-1 font-medium text-white-400"
                >
                  Your Email Address
                </label>
                <input
                  type="email"
                  id="email_field"
                  name="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    handleInputChange(e);
                  }}
                  className="mt-1 p-2 w-full bg-gray-700 text-white rounded border border-blue-950"
                />
              </div>

              <div className="flex items-center">
                <div className="w-16 h-12 space-x-4">
                  <figure className="avatar">
                    <img
                      src={avatarPreview}
                      className="rounded-full w-20 h-16"
                      alt="Avatar Preview"
                    />
                  </figure>
                </div>
                <div className="w-full flex flex-col flex-1">
                  <div className="flex justify-start px-4">
                    <label
                      htmlFor="avatar_upload"
                      className="block font-medium text-yellow-500"
                    >
                      Update Your Avatar
                    </label>
                  </div>
                  <div className="px-4 flex items-center">
                    <input
                      type="file"
                      name="avatar"
                      id="customFile"
                      onChange={onChangeAvatar}
                      className="hidden"
                    />
                    <label
                      htmlFor="customFile"
                      className="px-4 py bg-gradient-to-tl from-rose-950 to-red-600 via-rose-900 text-pale-blue font-semibold rounded-lg text-center cursor-pointer hover:bg-yellow-600"
                    >
                      Choose New Avatar
                    </label>
                    <span className="text-sm text-gray-300 ml-2 mt-2">
                      Max file size: 2MB
                    </span>
                  </div>
                </div>
              </div>
              <button
                id="update_button"
                type="submit"
                className={`w-full py-3 bg-gradient-to-tl from-indigo-300 to-indigo-300 via-indigo-950 text-white font-bold rounded-lg hover:to-gray-200 shadow-md hover:shadow-blue-500 hover:scale-105 duration-300 focus:outline-none ${
                  !change || loading ? "opacity-50 cursor-not-allowed" : ""
                }`}
                disabled={!change || loading}
              >
                {loading ? "Updating..." : "UPDATE PROFILE"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
