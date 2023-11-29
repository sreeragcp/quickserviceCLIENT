import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { NavLink } from "react-router-dom";
import { userRegisterFuction } from "../../services/Apis.js";
import * as yup from "yup";
import { userSignupValidation } from "../../validations/UserValidation";
import { useFormik} from "formik";

const initialValues = {
  name: "",
  email: "",
  mobile: "",
  password: "",
  confirmPassword: "",
};

const UserRegister = () => {


  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: userSignupValidation,
    onSubmit: async(values) => {
      try {

        const userData = {
          name: values.name,
          email: values.email,
          mobile: values.mobile,
          password: values.password,
        };

        localStorage.setItem('userData', JSON.stringify(userData));
        const res = await userRegisterFuction(userData)
        console.log(res);
        if (res.data.message === 'success') {
          localStorage.setItem("timer", new Date());
          navigate('/otp');
        } else if (res.message === 'Your email is already registered') {
          toast('Your email is already registered');
        }
        
      } catch (error) {
        toast.error(error.message);
      }
      
    },
  });

  const navigate = useNavigate();

  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />
      <div className="flex w-full max-w-sm mx-auto overflow-hidden bg-white rounded-lg shadow-lg dark:bg-gray-800 lg:max-w-4xl relative top-20">
        <div className="hidden bg-cover lg:block lg:w-1/2 justify-center items-center">
          <img
            className="w-auto h-80 sm:h-80 relative top-28"
            src="./images/bulk-booking.jpg"
            alt=""
          />
        </div>

        <div className="w-full px-6 py-8 md:px-8 lg:w-1/2">
          <div className="flex justify-center mx-auto">
            <img
              className="w-auto h-7 sm:h-8"
              src="./images/logo-blue.png"
              alt=""
            />
          </div>

          <p className="mt-3 text-xl text-center text-gray-600 dark:text-gray-200">
            Register
          </p>
          <div className="mt-4">
            <label
              className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200"
              htmlFor="LoggingName"
            >
              Name
            </label>
            <input
              id="LoggingName"
              className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-300"
              type="text"
              name="name"
              placeholder="Enter Name"
              // value={name}
              // onChange={(e) => setName(e.target.value)}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.name}
            />
            {formik.touched.name && formik.errors.name && (
              <div className="text-red-500 text-sm">{formik.errors.name}</div>
            )}
          </div>
          <div className="mt-4">
            <label
              className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200"
              htmlFor="LoggingEmailAddress"
            >
              Email Address
            </label>
            <input
              id="LoggingEmailAddress"
              className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-300"
              type="email"
              name="email"
              placeholder="Enter Email"
              // value={email}
              // onChange={(e) => setEmail(e.target.value)}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
            />
              {formik.touched.email && formik.errors.email && (
              <div className="text-red-500 text-sm">{formik.errors.email}</div>
            )}
          </div>

          <div className="mt-4">
            <label
              className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200"
              htmlFor="LoggingMobile"
            >
              Mobile
            </label>
            <input
              id="LoggingMobile"
              className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-300"
              type="number"
              name="mobile"
              placeholder="Enter Number"
              // value={mobile}
              // onChange={(e) => setMobile(e.target.value)} onChange={handleChange}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.mobile}
            />
             {formik.touched.mobile && formik.errors.mobile && (
              <div className="text-red-500 text-sm">{formik.errors.mobile}</div>
            )}
          </div>

          <div className="mt-4">
            <label
              className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200"
              htmlFor="LoggingPassword"
            >
              Password
            </label>
            <input
              id="LoggingPassword"
              className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-300"
              type="password"
              name="password"
              placeholder="Password"
              // value={password}
              // onChange={(e) => setPassword(e.target.value)}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
            />
            {formik.touched.password && formik.errors.password && (
              <div className="text-red-500 text-sm">{formik.errors.password}</div>
            )}
          </div>

          <div className="mt-4">
            <div className="flex justify-between">
              <label
                className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200"
                htmlFor="loggingConfirmPassword"
              >
                Confirm Password
              </label>
            </div>
            <input
              id="loggingConfirmPassword"
              className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-300"
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              // value={confirmPassword}
              // onChange={(e) => setConfirmPassword(e.target.value)}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.confirmPassword}
            />
              {formik.touched.confirmPassword && formik.errors.confirmPassword && (
              <div className="text-red-500 text-sm">{formik.errors.confirmPassword}</div>
            )}
          </div>

          <div className="mt-6">
            <button
              type="submit"
              className=" w-full px-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-gray-800 rounded-lg hover:bg-gray-700 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-50"
              onClick={formik.handleSubmit}
            >
              Sign Up
            </button>
          </div>
          <div className="flex items-center justify-between mt-4">
            <span className="w-1/5 border-b dark:border-gray-600 md:w-1/4"></span>
            <NavLink
              to="/signin"
              className="text-xs text-gray-500 uppercase dark:text-gray-400 hover:underline"
            >
              or sign In
            </NavLink>
            <span className="w-1/5 border-b dark:border-gray-600 md:w-1/4"></span>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserRegister;
