import { PlusIcon } from "lucide-react"
import { Link } from "react-router-dom";
import MenuSamping from "../../components/MenuSamping";
import CardModul from "../../components/Modul/CardModul";
import { useSelector } from "react-redux";
import ProtectedRoute from "@/utils/ProtectedRoute";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { fetchUsers } from "@/redux/fetchUser";

const Modul = () => {
  const user = useSelector((state: any) => state.data);
  const [modulData, setModulData] = useState([]);
  const [loadingModul, setLoadingModul] = useState<Boolean>(false);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUsers() as any); // Ambil data pengguna saat komponen di-mount

    const fetchModul = async () => {
      setLoadingModul(true);
      try {
        const response = await fetch(
          `${process.env.REACT_PUBLIC_API_KEY}/api/modul/read`,
          {
            method: "GET",
            headers: {
              Accept: "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        const json = await response.json();
        setModulData(json.data);
        setLoadingModul(false);
      } catch (error) {
        console.error(error);
        setLoadingModul(false);
      }
    };

    fetchModul();
  }, [dispatch]);

  if (loadingModul) return <div>Loading...</div>; // Show a loading state

  return (
    <ProtectedRoute>
      <header className="flex justify-between items-center">
        <div className="flex space-x-5">
          <h1 className="md:text-2xl font-bold">Input pembelajaran</h1>
          {user.roles === "teacher" && (
            <Link
              to="/modul/create"
              className="bg-primary text-white px-3 py-2 text-center rounded-xl md:flex hidden "
            >
              <PlusIcon />
              Tambah Sub Materi
            </Link>
          )}
        </div>
        <MenuSamping user={user} />
      </header>

      <main className="mt-8">
        {user.roles === "teacher" && (
          <Link
            to="/modul/create"
            className="bg-primary text-white px-3 py-2 text-center rounded-xl md:hidden flex justify-center items-center text-sm mb-8 "
          >
            <PlusIcon />
            Tambah Sub Materi
          </Link>
        )}
        <div className="grid grid-cols-2 gap-3 md:flex md:flex-wrap">
          {modulData.map((modul: any) => (
            <CardModul key={modul.id} modul={modul} />
          ))}
        </div>
      </main>
    </ProtectedRoute>
  );
};

export default Modul