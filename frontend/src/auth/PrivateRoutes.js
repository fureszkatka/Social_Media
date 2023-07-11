import { isAuthenticated } from "./index";
import React from "react";
import { Navigate,Outlet } from "react-router";

const PrivateRoutes = ({children}) =>{
  
    return (
    !isAuthenticated() ? 
    <Navigate to="/signin" />
    : 
    children
    )}

export default PrivateRoutes  
