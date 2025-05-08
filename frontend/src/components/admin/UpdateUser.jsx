import { Fragment, useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getUser, updateUser } from "../../actions/userActions";
import { toast } from "react-toastify";
import { clearError, clearUserUpdated } from "../../slices/userSlice";

export default function UpdateUser() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");

  const { id: userId } = useParams();
  const { loading, isUserUpdated, error, user } = useSelector(
    (state) => state.userState
  );
  const { user: authUser } = useSelector((state) => state.authState);

  const dispatch = useDispatch();
  const [change, setChange] = useState(false);

  const submitHandler = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("role", role);
    dispatch(updateUser(userId, formData));
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
    if (isUserUpdated) {
      toast("User Updated Successfully!", {
        type: "success",
        position: toast.POSITION.BOTTOM_CENTER,
        onOpen: () => dispatch(clearUserUpdated()),
      });
    } else if (error) {
      toast(error, {
        position: toast.POSITION.BOTTOM_CENTER,
        type: "error",
        onOpen: () => {
          dispatch(clearError());
        },
      });
      setChange(false);
      return;
    } else {
      dispatch(getUser(userId));
    }
  }, [isUserUpdated, error, dispatch, userId]);

  useEffect(() => {
    if (user._id) {
      setName(user.name);
      setEmail(user.email);
      setRole(user.role);
    }
  }, [user]);

  return (
    <div
      className={`bg-slate-900 font-montserrat text-pale-blue px-4 min-h-screen p-8`}
    >
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 mt-20">
        <div className="col-span-1 md:col-span-2">
          <Sidebar />
        </div>
        <div className="col-span-1 md:col-span-10">
          <Fragment>
            <div className="flex justify-center mt-5">
              <form
                onSubmit={submitHandler}
                className={`w-full max-w-md px-4 py-2 bg-gradient-to-bl from-blue-950 to-cyan-700 via-stone-800 rounded-lg mb-2 mt-8`}
                encType="multipart/form-data"
              >
                <div className="bg-slate-900 p-3 shadow-sm shadow-teal-600 mb-2">
                  <h1 className="font-montserrat text-3xl text-white-400 font-bold text-center ">
                    Update <span className="text-red-600">User</span>
                  </h1>
                </div>

                <div className="mb-4">
                  <label htmlFor="name_field" className="block font-medium">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name_field"
                    className="mt-1 p-2 w-full bg-gray-300 text-stone-900 rounded border border-blue-950"
                    onChange={(e) => {
                      setName(e.target.value);
                      handleInputChange(e);
                    }}
                    value={name}
                  />
                </div>

                <div className="mb-4">
                  <label htmlFor="price_field" className="block font-medium">
                    Email
                  </label>
                  <input
                    type="text"
                    id="price_field"
                    className="mt-1 p-2 w-full bg-gray-300 text-stone-900 rounded border border-blue-950"
                    onChange={(e) => {
                      setEmail(e.target.value);
                      handleInputChange(e);
                    }}
                    value={email}
                  />
                </div>

                <div className="mb-4">
                  <label htmlFor="category_field" className="block font-medium">
                    Role
                  </label>
                  <select
                    disabled={user._id === authUser._id}
                    value={role}
                    onChange={(e) => {
                      setRole(e.target.value);
                      handleInputChange(e);
                    }}
                    className="mt-1 p-3 w-full bg-gray-300 text-stone-900 rounded border border-blue-950"
                    id="category_field"
                  >
                    <option value="admin">Admin</option>
                    <option value="user">User</option>
                  </select>
                </div>

                <button
                  id="login_button"
                  type="submit"
                  className={`w-full mb-3 py-3 bg-gradient-to-b from-gray-900 to-gray-700 via-sl text-white font-bold rounded hover:to-stone-900 hover:scale-105 duration-300 focus:outline-none`}
                  disabled={! change || loading}
                >
                  UPDATE
                </button>
              </form>
            </div>
          </Fragment>
        </div>
      </div>
    </div>
  );
}
