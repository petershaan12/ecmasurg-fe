import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { fetchUsers } from "@/redux/fetchUser"; // Import aksi fetchUsers
import { RootState } from "@/redux/store"; // Import RootState jika ada

const isAuthenticated = () => {
  return localStorage.getItem("token") !== null;
};

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.data); // Ambil data pengguna dari store
  const loading = useSelector((state: RootState) => state.loading); // Ambil loading state
  const error = useSelector((state: RootState) => state.error); // Ambil error state

  useEffect(() => {
    if (isAuthenticated() && !user) {
      dispatch(fetchUsers() as any);
    }
  }, [dispatch, user, loading]);

  if (!isAuthenticated()) return <Navigate to="/signup" />; // Redirect jika tidak terautentikasi
  if (loading) return <div>Loading...</div>; // Tampilkan loading jika sedang mengambil data
  if (error) return <div>Error! {error.message}</div>; // Tampilkan error jika ada

  return <>{children}</>; // Render children jika semua kondisi terpenuhi
};

export default ProtectedRoute;
