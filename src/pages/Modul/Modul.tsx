import { PlusIcon } from "lucide-react"
import { Link } from "react-router-dom";
import MenuSamping from "../../components/MenuSamping";
import CardModul from "../../components/Modul/CardModul";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import axios from "axios";
import Loading from "@/components/Loading";

const Modul = () => {
  const user = useSelector((state: any) => state.data);
  const [modul, setModul] = useState([]);
  const [loading, setLoading] = useState<Boolean>(false);

  useEffect(() => {
    const fetchModul = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `${process.env.REACT_PUBLIC_API_KEY}/api/modul`,
          {
            headers: {
              Accept: "application/json",
              Authorization: `Bearer ${sessionStorage.getItem("token")}`,
            },
          }
        );

        const json = response.data;
        setModul(json.data);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    fetchModul();
  }, []);

  if (loading) return <Loading />; // Show a loading state

  return (
    <>
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
        <MenuSamping />
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
        <div className="grid grid-cols-2 gap-x-3 md:flex md:flex-wrap">
          {modul.map((modul: any) => (
            <CardModul key={modul.id} modul={modul} />
          ))}
        </div>
      </main>
    </>
  );
};

export default Modul