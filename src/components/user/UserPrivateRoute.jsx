import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const UserPrivateRoute = () => {
  const {tocken} = useSelector((state) => state.user);
  return tocken ? <Outlet /> : <Navigate to="/signin" replace />;
};

export default UserPrivateRoute;
