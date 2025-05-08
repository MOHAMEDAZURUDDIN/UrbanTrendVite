import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import defImg from "../../assets/default_avatar.png"
export default function Profile() {
  const { user } = useSelector((state) => {
    console.log(state);
    return state.authState;
  });

  return (
    <div className="bg-slate-900 text-gray-500 min-h-screen px-4 py-2">
      <div className="mt-28 text-center font-montserrat">
        {/* Row 1 */}
        <div className="mb-8">
          <h1 className=" text-3xl font-bold text-white-400 ">
            Your <span className="text-coral-red">Profile</span>  
          </h1>
        </div>

        {/* Row 2 - Using Grid */}
        <div className="grid grid-cols-3 md:grid-cols-2 lg:grid-cols-3">
          {/* Column 1 - Profile Image */}
          <div className="md:col-span-1 lg:col-span-1">
            <img
              className="rounded-lg mx-auto w-56 h-48  object-cover"
              src={user?.avatar || defImg}
              alt="Profile"
            />
          </div>

          {/* Column 2 - User Details */}
          {user && (
            <div className="md:col-span-1 lg:col-span-1">
              <div className="mb-4">
                <h4 className="font-bold text-lg">Full Name:</h4>
                <span className="text-white-400">{user.name}</span>
              </div>

              <div className="mb-4">
                <h4 className="font-bold text-lg">Email Address:</h4>
                <span className="text-white-400">{user.email}</span>
              </div>

              <div className="mb-4">
                <h4 className="font-bold text-lg">Joined:</h4>
                <p className="text-rose-500 font-semibold">
                  {String(user.createdAt).substring(0, 10)}
                </p>
              </div>
            </div>
          )}

          {/* Column 3 - Buttons */}
          <div className="md:col-span-2 lg:col-span-1 grid grid-cols-1 md:grid-cols-3 gap-2">
            <div>
              <Link to="/myprofile/update">
                <button
                  id="edit_profile"
                  className="p-2 bg-slate-950 text-white shadow-md hover:shadow-lime-500 hover:scale-105 duration-300 rounded mt-1"
                >
                  Edit Profile
                </button>
              </Link>
            </div>

            <div>
              <Link to="/orders">
                <button
                  id="orders"
                  className="p-2 bg-purple-950 text-white rounded shadow-md hover:shadow-lime-500 hover:scale-105 duration-300 mt-1"
                >
                  My Orders
                </button>
              </Link>
            </div>
          </div>
          <div className="col-span-3 mt-5">
            <Link to="/myprofile/update/password">
              <button
                id="change_password"
                className="p-2 bg-rose-950 text-white shadow-md hover:shadow-lime-500 hover:scale-105 duration-300 rounded mt-1"
              >
                Change Password
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
