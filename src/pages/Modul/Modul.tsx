import { PlusIcon } from "lucide-react"
import { Link } from "react-router-dom";
import MenuSamping from "../../components/MenuSamping";
import CardModul from "../../components/Modul/CardModul";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import axios from "axios";
import Loading from "@/components/Loading";
import CardModulHorizontal from "@/components/Modul/CardModulHorizontal";
import { motion } from "framer-motion";
import Cookies from "js-cookie";
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
              Authorization: `Bearer ${Cookies.get("token")}`,
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

  if (loading) return <Loading />;

  return (
    <>
      <header className="flex justify-between items-center">
        <div className="flex space-x-5 items-center">
          <h1 className="md:text-xl font-bold">Input pembelajaran</h1>
          {user.roles === "teacher" && (
            <Link
              to="create"
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
            to="/home/modul/create"
            className="bg-primary text-white px-3 py-2 text-center rounded-xl md:hidden flex justify-center items-center text-sm mb-8 "
          >
            <PlusIcon />
            Tambah Sub Materi
          </Link>
        )}
        <div className="hidden md:flex md:flex-wrap gap-x-5 gap-y-5">
          {modul.map((modul: any, index: number) => (
            <motion.div
              key={modul.id}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.2 }}
            >
              <CardModul key={modul.id} modul={modul} />
            </motion.div>
          ))}
        </div>
        <div className="md:hidden grid gap-y-5">
          {modul.map((modul: any, index: number) => (
            <motion.div
              key={modul.id}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.2 }}
            >
              <CardModulHorizontal key={modul.id} modul={modul} />
            </motion.div>
          ))}
        </div>
      </main>
    </>
  );
};

export default Modul