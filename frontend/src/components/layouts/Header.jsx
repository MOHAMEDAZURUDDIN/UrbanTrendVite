import React, { useEffect, useState } from "react";
import defaultImg from "../../assets/default_avatar.png";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../../actions/userActions";
import shoesLogo from "../../assets/logo.png";
const Header = () => {
  const [navState, setNavState] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { isAuthenticated, user } = useSelector((state) => state.authState);

  const logoutHandler = () => {
    dispatch(logout);
    navigate("/login");
  };
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const onNavScroll = () => {
    if (window.scrollY > 30) {
      setNavState(true);
    } else {
      setNavState(false);
    }
  };
  useEffect(() => {
    window.addEventListener("scroll", onNavScroll);
    return () => {
      window.removeEventListener("scroll", onNavScroll);
    };
  }, []);

  return (
    <>
      <header
        className={
          !navState
            ? "absolute left-0 right-0 opacity-100 z-50"
            : "fixed top-0 left-0 right-0 h-[12vh] flex items-center justify-center opacity-100 z-[110] blur-effect-theme"
        }
      >
        <nav className="font-montserrat flex items-center justify-between shoes-container">
          <div className="flex items-center">
            <Link to="/">
              <img
                src={shoesLogo}
                alt="logo/img"
                className={`w-20  h-auto ${
                  navState && "filter brightness-0 "
                } hover:rotate-[360deg] hover:scale-105 duration-500 `}
              />
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <div className="relative">
                <button
                  onClick={toggleDropdown}
                  className="flex items-center text-white"
                >
                  <img
                    src={user?.avatar || defaultImg}
                    alt="User Avatar"
                    className="w-14 h-10 rounded object-cover"
                  />
                  <span
                    className={`ml-2 max-lg:hidden text-black font-semibold ${
                      navState && "text-slate-900"
                    }`}
                  >
                    {user.name}
                  </span>
                </button>
                {isDropdownOpen && (
                  <ul className="absolute right-0 w-32 mt-2 bg-white rounded shadow-lg z-10">
                    {user.role === "admin" && (
                      <li>
                        <button
                          onClick={() => {
                            navigate("/admin/dashboard");
                            toggleDropdown();
                          }}
                          className="block p-2 font-semibold text-stone-900 hover:bg-blue-500 hover:rounded focus:outline-none"
                        >
                          Dashboard
                        </button>
                      </li>
                    )}

                    <li>
                      <button
                        onClick={() => {
                          logoutHandler();
                          toggleDropdown();
                        }}
                        className="block p-2 font-semibold text-stone-900 hover:bg-gray-300 hover:rounded focus:outline-none"
                      >
                        Logout
                      </button>
                    </li>
                  </ul>
                )}
              </div>
            ) : (
              <Link
                to="/login"
                className={`bg-slate-900 text-white-400 text-xl px-4 py-2 mb-2 font-bold  rounded hover:bg-black hover:scale-105 duration-300 ${navState}`}
                id="login_btn"
              >
                Lo<span className="text-red-600">g</span>in
              </Link>
            )}
          </div>
        </nav>
      </header>
    </>
  );
};

export default Header;
