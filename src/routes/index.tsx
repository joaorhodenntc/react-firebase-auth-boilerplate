import { useContext } from "react";
import { AuthContext } from "../context/authContext";
import { Navigate, Outlet } from "react-router-dom";

export const PrivateRoutes = () => {
    const {signed} = useContext(AuthContext);
    return (
      signed ? <Outlet /> : <Navigate to="/"/>
    );
   }