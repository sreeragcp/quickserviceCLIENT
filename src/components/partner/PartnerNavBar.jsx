import React, { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../slices/authSlice";

const PartnerNavBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const n = useLocation();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const dispatch = useDispatch()
  
  const partnerData = useSelector((state)=>state?.tocken?.partnerData) 

  const handleLogout = async()=>{
    dispatch(logout());
  }

  return (
    <div className="flex justify-center   h-fit mt-9">
      <nav
        className="relative bg-white shadow dark:bg-gray-800"
        x-data={{ isOpen }}
      >
        <div className="container px-6 py-4 mx-auto">
          <div className="lg:flex lg:items-center lg:justify-between">
            <div className="flex items-center justify-between">
              {/* <a href="#">
              <img
                className="w-auto h-6 sm:h-7"
                src="https://merakiui.com/images/full-logo.svg"
                alt=""
              />
            </a> */}

              <h1 className="font-bold ">Service Partner</h1>

              <div className="flex lg:hidden">
                <button
                  x-cloak
                  onClick={toggleMenu}
                  type="button"
                  className="text-gray-500 dark:text-gray-200 hover:text-gray-600 dark:hover:text-gray-400 focus:outline-none focus:text-gray-600 dark:focus:text-gray-400"
                  aria-label="toggle menu"
                >
                  {!isOpen && (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-6 h-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path
                        d="M4 8h16M4 16h16"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  )}

                  {isOpen && (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-6 h-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path
                        d="M6 18L18 6M6 6l12 12"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            <div
              x-cloak
              className={`absolute inset-x-0 z-20 w-full px-6 py-4 transition-all duration-300 ease-in-out bg-white dark:bg-gray-800 lg:mt-0 lg:p-0 lg:top-0 lg:relative lg:bg-transparent lg:w-auto lg:opacity-100 lg:translate-x-0 lg:flex lg:items-center ${
                isOpen
                  ? "translate-x-0 opacity-100"
                  : "opacity-0 -translate-x-full"
              }`}
            >
              <div className="flex flex-col -mx-6 lg:flex-row lg:items-center lg:mx-8">
                <NavLink
                  to="/partner/dashboard"
                  className={
                    location.pathname === "/partner/dashboard"
                      ? "px-3 py-2 mx-3 mt-2 text-gray-700 transition-colors  duration-300 transform rounded-md lg:mt-0 dark:text-gray-200 bg-gray-100 dark:hover:bg-gray-700 hover:scale-110"
                      : "px-3 py-2 mx-3 mt-2 text-gray-700 transition-colors  duration-300 transform rounded-md lg:mt-0 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 hover:scale-110"
                  }
                >
                  Dashboard
                </NavLink>
                <NavLink
                  to="/partner/orderManage"
                  className={
                    location.pathname === "/partner/orderManage"
                      ? "px-3 py-2 mx-3 mt-2 text-gray-700 transition-colors  duration-300 transform rounded-md lg:mt-0 dark:text-gray-200 bg-gray-200 border  hover:scale-110 "
                      : "px-3 py-2 mx-3 mt-2 text-gray-700 transition-colors  duration-300 transform rounded-md lg:mt-0 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700  hover:scale-110  "
                  }
                >
                  OrderManage
                </NavLink>
                <NavLink
                  to="/partner/bookings"
                  className={
                    location.pathname === "/partner/bookings"
                      ? "px-3 py-2 mx-3 mt-2 text-gray-700 transition-colors duration-300 transform rounded-md lg:mt-0 dark:text-gray-200 bg-gray-100 dark:hover:bg-gray-700 hover:scale-110   "
                      : "px-3 py-2 mx-3 mt-2 text-gray-700 transition-colors duration-300 transform rounded-md lg:mt-0 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 hover:scale-110"
                  }
                >
                  Bookings
                </NavLink>
              
                <NavLink
                  to="/partner/profile"
                  className={
                    location.pathname === "/partner/profile"
                      ? "px-3 py-2 mx-3 mt-2 text-gray-700 transition-colors duration-300 transform rounded-md lg:mt-0 dark:text-gray-200 bg-gray-100 dark:hover:bg-gray-700 hover:scale-110 "
                      : "px-3 py-2 mx-3 mt-2 text-gray-700 transition-colors duration-300 transform rounded-md lg:mt-0 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 hover:scale-110 "
                  }
                >
                  Profile
                </NavLink>

       
              <NavLink
              to="/partner"
             onClick={handleLogout}
              className={
                location.pathname === "/partner"
                  ? "px-3 py-2 mx-3 mt-2 text-gray-700 transition-colors duration-300 transform rounded-md lg:mt-0 dark:text-gray-200 bg-gray-100 dark:hover:bg-gray-700 hover:scale-110"
                  : "px-3 py-2 mx-3 mt-2 text-gray-700 transition-colors duration-300 transform rounded-md lg:mt-0 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 hover:scale-110"
              }
            >
              Sign Out
            </NavLink>
          
              </div>

              <div className="flex items-center mt-4 lg:mt-0">
                <button
                  type="button"
                  className="flex items-center focus:outline-none"
                  aria-label="toggle profile dropdown"
                >
                  <div className="w-8 h-8 overflow-hidden border-2 border-gray-400 rounded-full">
                    <img
                      src="https://imgs.search.brave.com/gxJ-fW7q71Wdlzc1ddKoafgQ0U90t9eh19w6WhmQ48E/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5zcHJvdXRzb2Np/YWwuY29tL3VwbG9h/ZHMvMjAyMi8wNi9w/cm9maWxlLXBpY3R1/cmUuanBlZw"
                      className="object-cover w-full h-full"
                      alt="avatar"
                    />
                  </div>

                  <h3 className="mx-2 text-gray-700 dark:text-gray-200 lg:hidden">
                    Khatab wedaa
                  </h3>
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default PartnerNavBar;
