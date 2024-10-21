import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

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
              Authorization: `Bearer ${localStorage.getItem("token")}`,
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

  return (
    <div>
      <h1 className="text-xl mb-5">Modul Pembelajaran </h1>
      {loading ? (
        <p>Loading...</p> // Tampilkan loading saat data diambil
      ) : (
        <ul className="list-decimal ml-5">
          {modul.map((item: any) => (
            <li key={item.id}>
              <Link
                to={`/modul/${item.id}`} // Arahkan ke link modul berdasarkan ID
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
