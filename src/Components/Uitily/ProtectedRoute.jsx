import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import Cookies from "js-cookie";

const ProtectedRoute = ({ allowedRoles }) => {
  const token = Cookies.get("refresh");
  const userCookie = Cookies.get("user");

  if (!token || !userCookie) {
    return <Navigate to="/" />;
  }

  let user;
  try {
    user = JSON.parse(userCookie);
  } catch (e) {
    return <Navigate to="/" />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/" />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
