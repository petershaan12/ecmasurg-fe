import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { fetchUsers } from "@/redux/fetchUser";
import { RootState } from "@/redux/store";
import Loading from "@/components/Loading";
import axios from "axios";
import Cookies from "js-cookie";

const isAuthenticated = () => {
  return Cookies.get("token") !== null;
};

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.data);
  const loading = useSelector((state: RootState) => state.loading);
  const error = useSelector((state: RootState) => state.error);

  const [isTokenValid, setIsTokenValid] = useState(true);

  useEffect(() => {
    const checkTokenValidity = async () => {
      const token = Cookies.get("token");
      if (token) {
        try {
          await axios.get(
            `${process.env.REACT_PUBLIC_API_KEY}/api/verifytoken`,
            {
              headers: {
                Accept: "application/json",
                Authorization: `Bearer ${Cookies.get("token")}`,
              },
            }
          );
          setIsTokenValid(true);
        } catch (err) {
          console.log("token invalid");
          setIsTokenValid(false);
          Cookies.remove("token");
        }
      } else {
        setIsTokenValid(false);
      }
    };

    checkTokenValidity();

    if (isAuthenticated() && !user) {
      dispatch(fetchUsers() as any);
    }
  }, [dispatch, user, loading]);

  if (!isTokenValid) return <Navigate to="/login" />;
  if (!isAuthenticated()) return <Navigate to="/" />;
  if (loading) return <Loading />;
  if (error) return <div>Error! {error.message}</div>;
  return <>{children}</>;
};

export default ProtectedRoute;
