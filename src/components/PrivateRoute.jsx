import React from "react";
import { Navigate } from "react-router-dom";
import { isLoggedIn } from "../helper/auth";

const PrivateRoute = ({ children }) => {
  return isLoggedIn() ? children : <Navigate to="/login" />;
};

export default PrivateRoute;