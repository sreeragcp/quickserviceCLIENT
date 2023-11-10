import React, { useState } from "react";
import { resetPasswordFunction } from "../../services/Apis";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { userNewPasswordValidation } from "../../validations/UserValidation";
import { useFormik } from "formik";
import * as yup from "yup";

const initialValues = {
  password: "",
  confirmPassword: "",
};

const UserNewPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: userNewPasswordValidation,
    onSubmit: async (values) => {
      try {
        const password = {
          password: values.password,
        };

        const res = await resetPasswordFunction({ password });
        if (res.data.success) {
          navigate("/signin");
        }
      } catch (error) {
        toast.error(error);
      }
    },
  });

  // const submitHandler = async (e) => {
  //    e.preventDefault()
  //   if (password !== confirmPassword) {
  //     toast.error("Password do not match");
  //   } else {
  //     try {
  //       const res = await resetPasswordFunction({password});
  //       if (res.data.success) {
  //         navigate("/signin");
  //       }
  //     } catch (error) {
  //       toast.error(error);
  //     }
  //   }
  // };

  return (
    <>
      <div className="flex justify-center items-center h-full">
        <div className="card ml-5 mt-32 w-5/12 bg-base-100 shadow-xl image-full">
          <figure>
            <img src="./images/bulk-booking.jpg" alt="Shoes" />
          </figure>
          <div className="card-body">
            <p>Enter new Password</p>
            <div className="ml-28 mb-28">
              <input
                type="text"
                // value={password}
                name="password"
                placeholder="New Password"
                className="input input-ghost w-full max-w-xs"
                // onChange={(e) => setPassword(e.target.value)}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
              />
               {formik.touched.password && formik.errors.password && (
              <div className="text-red-500 text-sm">{formik.errors.password}</div>
            )}
              <br />
              <br />
              <input
                type="text"
                name="confirmPassword"
                // value={confirmPassword}
                placeholder="ConfirmPassword"
                className="input input-ghost w-full max-w-xs"
                // onChange={(e) => setConfirmPassword(e.target.value)}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.confirmPassword}
              />
               {formik.touched.confirmPassword && formik.errors.confirmPassword && (
              <div className="text-red-500 text-sm">{formik.errors.confirmPassword}</div>
            )}
            </div>
            <div className="card-actions justify-end">
              <button className="btn btn-outline" onClick={formik.handleSubmit}>
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserNewPassword;
