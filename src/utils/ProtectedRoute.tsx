import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "@/redux/fetchUser";
import { Navigate } from "react-router-dom";
import { ReactNode } from "react";

interface RootState {
  data: any; // Replace 'any' with the actual type of your items
  loading: boolean;
  error: Error | null;
}

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.data);
  const loading = useSelector((state: RootState) => state.loading);
  const error = useSelector((state: RootState) => state.error);

  useEffect(() => {
    if (!user && !loading) {
      dispatch(fetchUsers() as any);
    }
  }, [user, loading, dispatch]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error! {error.message}</div>;
  if (!user) return <Navigate to="/login" />;

  return children;
};

export default ProtectedRoute;
