import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

type MyModulProps = {
  id: string;
};

const MyModul = ({ id }: MyModulProps) => {
  const [modul, setModul] = useState([]);
  const [loading, setLoading] = useState<Boolean>(false);

  useEffect(() => {
    const fetchModul = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `${process.env.REACT_PUBLIC_API_KEY}/api/modul/getmymodul/${id}`,
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
  }, [id]);

  return (
    <div>
      <h1 className="text-xl mb-5">Modul Pembelajaran </h1>
      {loading ? (
        <div className="flex flex-col items-center justify-center mt-14">
          <div className="flex space-x-2">
            <div className="h-2 w-2 rounded-full bg-primary animate-bounce"></div>
            <div className="h-2 w-2 rounded-full bg-primary animate-bounce2"></div>
            <div className="h-2 w-2 rounded-full bg-primary animate-bounce"></div>
          </div>
          <div className="mt-4 text-center">
            <p className="text-lg font-semibold text-gray-700">Loading...</p>
          </div>
        </div>
      ) : modul.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex space-x-5 items-center pt-8 px-8"
        >
          <img src="/not-item.webp" alt="item" width={100} height={100} />
          <div>
            <p className="mb-2 text-xl font-semibold">Belum ada modul</p>
            <Link
              to="/home/modul/create"
              className="bg-primary text-white py-1 px-3 rounded-lg mt-5"
            >
              Buat Modul
            </Link>
          </div>
        </motion.div>
      ) : (
        <ul className="list-decimal ml-5">
          {modul.map((item: any) => (
            <li key={item.id}>
              <Link
                to={`/home/modul/${item.id}`}
                className="text-blue-500 underline font-bold"
              >
                {item.judul} {/* Tampilkan judul modul */}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MyModul;
