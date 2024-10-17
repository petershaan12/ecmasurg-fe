import App from "@/App";
import { Navigate } from "react-router-dom";

const isAunthenticated = () => {
  return localStorage.getItem("token") !== null;
};

const PrivateRoute = () => {
  return isAunthenticated() ? <App /> : <Navigate to="/login" />;
};

export default PrivateRoute;
