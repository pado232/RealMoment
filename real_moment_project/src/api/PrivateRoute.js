import React from "react";
import { Navigate } from "react-router-dom";
import { getCookie } from "./Cookies";

const PrivateRoute = ({ element: Component }) => {
  return getCookie("Id") ? <Component /> : <Navigate to="/login" replace />;
};

export default PrivateRoute;
