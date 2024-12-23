import { ArrowLeft, Edit } from "lucide-react";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import MenuSamping from "../../components/MenuSamping";
import Materi from "../../components/Modul/Materi";
import Tugas from "../../components/Modul/Tugas";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import HapusModul from "@/components/Modul/HapusModul";
import axios from "axios";
import HapusSubModul from "@/components/Modul/HapusSubModul";
import Loading from "@/components/Loading";
import Evaluasi from "@/components/Modul/Evaluasi";
import HapusEvaluasi from "@/components/Modul/HapusEvaluasi";
import { motion } from "framer-motion";
import Cookies from "js-cookie";

type Modul = {
  judul: string;
  asignd_teacher?: {
    name: string;
  };
  description?: string;
};

type subModul = {
  length: number;
  created_at: string;
  id: number;
  judul: string;
  type: string;
  file: string;
  time: string;
};

type evaluasi = {
  id: number;
  judul: string;
  title: string;
  time: string;
  type: string; // Add this line
};

const SubModul = () => {
  const { id } = useParams();
  const user = useSelector((state: any) => state.data);
  const navigate = useNavigate();

  const [modul, setModul] = useState<Modul>();
  const [subModul, setSubModul] = useState<subModul[]>([]);
  const [evaluasi, setEvaluasi] = useState<evaluasi[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [loadingSubModul, setLoadingSubModul] = useState<boolean>(true);
  const [loadingEvaluasi, setLoadingEvaluasi] = useState<boolean>(true);
  const combinedItems = [...subModul, ...evaluasi].sort(
    (a, b) => new Date(a.time).getTime() - new Date(b.time).getTime()
  );

  const fetchModul = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `${process.env.REACT_PUBLIC_API_KEY}/api/modul/show/${id}`,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
        }
      );

      const json = await response.json();
      setModul(json.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const fetchSubModul = async () => {
    setLoadingSubModul(true);
    try {
      const response = await axios.get(
        `${process.env.REACT_PUBLIC_API_KEY}/api/modul/${id}`, 
        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
        }
      );

      setSubModul(response.data.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingSubModul(false);
    }
  };

  const fetchEvaluasi = async () => {
    setLoadingSubModul(true);
    try {
      const response = await axios.get(
        `${process.env.REACT_PUBLIC_API_KEY}/api/modul/evaluasi/${id}`, 
        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
        }
      );

      setEvaluasi(response.data.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingEvaluasi(false);
    }
  };

  useEffect(() => {
    fetchModul();
    fetchSubModul();
    fetchEvaluasi();
  }, [id]);

  if (loading || loadingSubModul || loadingEvaluasi) return <Loading />;

  if (!modul) return <Navigate to="/404" />;

  if (!subModul) return <Loading />;

  const isModulOwner =
    user.roles === "teacher" && modul.asignd_teacher?.name === user.name;

  return (
    <>
      <header className="flex justify-between">
        <div className="flex space-x-5 items-center">
          <button
            onClick={() => {
              navigate(-1);
            }}
          >
            <ArrowLeft className="hover:bg-primary/20 rounded-full" />
          </button>
          <h1 className="text-base md:flex items-center hidden">
            <Link to="/modul" className="hover:underline ">
              Modul Pembelajaran
            </Link>{" "}
            / {modul?.judul ?? <Loading />}
          </h1>
        </div>
        <MenuSamping />
      </header>

      <main className="mt-8 ">
        <section>
          <div>
            <h1 className="text-lg md:text-2xl font-bold">{modul.judul}</h1>
            <p className="bg-primary px-5 py-1 text-white w-fit rounded-full my-2 text-sm md:text-base">
              {modul.asignd_teacher ? modul.asignd_teacher.name : "None"}
            </p>

            <div className="bg-white px-4 py-6 mt-8 rounded-xl">
              <h5 className="font-bold md:text-xl my-2">{modul.judul}</h5>
              <p className="text-sm">{modul.description}</p>
            </div>
          </div>
          <div>
            {isModulOwner && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 my-2">
                <Link
                  to={`/home/modul/${id}/create`}
                  className="bg-primary text-white px-3 py-2 space-x-2 text-center rounded flex justify-center items-center text-sm"
                >
                  <FaPlus />
                  <span>Add Task</span>
                </Link>
                <Link
                  to={`/home/modul/${id}/evaluasi/create`}
                  className="bg-primary text-white px-3 py-2 space-x-2 text-center rounded flex justify-center items-center text-sm"
                >
                  <FaPlus />
                  <span>Add Evaluation</span>
                </Link>
                <Link
                  to={`/home/modul/${id}/edit`}
                  className="bg-[#FDFF79] text-black px-3 py-2 space-x-2 text-center rounded flex justify-center items-center text-sm"
                >
                  <Edit className="w-4" />
                  <span>Edit This Modul</span>
                </Link>
                <HapusModul id={id as string} />
              </div>
            )}
          </div>
        </section>

        {/* Render combinedItems */}
        <div className="mt-8">
          {combinedItems && combinedItems.length > 0 ? (
            combinedItems.map((item, index) => (
              <motion.section
                key={index}
                className="mt-6"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
              >
                {/* Display Date Header */}
                <h3 className="font-bold text-[#737373]">
                  {new Date(item.time).toLocaleDateString("id-ID", {
                    weekday: "long",
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </h3>

                {item.type === "material" && (
                  <Link to={`materi/${item.id}`} replace={false}>
                    <Materi subModul={item as subModul} />
                  </Link>
                )}
                {item.type === "assignment" && (
                  <Link to={`assignment/${item.id}`} replace={false}>
                    <Tugas subModul={item as subModul} />
                  </Link>
                )}
                {!item.type && (
                  <Link to={`evaluasi/${item.id}`} replace={false}>
                    <Evaluasi evaluasi={item as evaluasi} />
                  </Link>
                )}

                {/* Edit/Delete options for subModul items */}
                {isModulOwner && item.type && (
                  <div className="flex space-x-2">
                    <Link
                      to={`/home/modul/${id}/edit/${item.id}`}
                      className="text-blue-500 hover:underline"
                    >
                      Edit
                    </Link>
                    <HapusSubModul id={item.id.toString()} />
                  </div>
                )}
                {isModulOwner && !item.type && (
                  <div className="flex space-x-2">
                    <Link
                      to={`/home/modul/${id}/evaluasi/edit/${item.id}`}
                      className="text-blue-500 hover:underline"
                    >
                      Edit
                    </Link>
                    <HapusEvaluasi id={item.id.toString()} />
                  </div>
                )}
              </motion.section>
            ))
          ) : (
            <div className="mt-112">
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="md:flex space-x-5 items-center justify-center mx-auto pt-8 px-8 w-full "
              >
                <img
                  src="/not-item.webp"
                  alt="item"
                  width={150}
                  height={100}
                  className="mx-auto md:m-0 w-32 mb-6 "
                />
                <div>
                  <p className="mb-2 text-xl font-semibold w-56 text-center md:text-left">
                    Belum ada sub modul yang ditambahkan
                  </p>
                </div>
              </motion.div>
            </div>
          )}
        </div>
      </main>
    </>
  );
};

export default SubModul;
