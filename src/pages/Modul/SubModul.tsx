import { ArrowLeft } from "lucide-react";
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
};

const SubModul = () => {
  const { id } = useParams();
  const user = useSelector((state: any) => state.data);
  const navigate = useNavigate();

  const [modul, setModul] = useState<Modul>();
  const [subModul, setSubModul] = useState<subModul[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [loadingSubModul, setLoadingSubModul] = useState<boolean>(true);

  const fetchModul = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `${process.env.REACT_PUBLIC_API_KEY}/api/modul/show/${id}`,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      const json = await response.json();
      setModul(json.data);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
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
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      setSubModul(response.data.data);
      setLoadingSubModul(false);
    } catch (error) {
      console.error(error);
      setLoadingSubModul(false);
    } finally {
      setLoadingSubModul(false);
    }
  };

  useEffect(() => {
    fetchModul();
    fetchSubModul();
  }, [id]);

  if (loading || loadingSubModul) return <div>Loading...</div>;

  if (!modul) return <Navigate to="/404" />;

  if (!subModul) return <div>Loading...</div>;

  console.log(subModul);

  const renderDateHeader = (subModul: any[]) => {
    return subModul.map((modul: any, index: number) => {
      const modulDate = new Date(modul.created_at).toLocaleDateString("id-ID", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
      });

      const isFirstModul = index === 0;
      const isDifferentDate =
        index > 0 &&
        modulDate !==
          new Date(subModul[index - 1].created_at).toLocaleDateString("id-ID", {
            weekday: "long",
            day: "numeric",
            month: "long",
            year: "numeric",
          });

      return {
        dateHeader: isFirstModul || isDifferentDate ? modulDate : null,
        modul,
      };
    });
  };

  return (
    <>
      <header className="flex justify-between">
        <div className="flex space-x-5 items-center">
          <button
            onClick={() => {
              navigate(-1);
            }}
          >
            <ArrowLeft />
          </button>
          <h1 className="text-base">
            <Link to="/modul" className="hover:underline">
              Modul Pembelajaran
            </Link>{" "}
            / {modul?.judul ?? "Loading..."}
          </h1>
        </div>
        <MenuSamping />
      </header>

      <main className="mt-8 ">
        <section>
          <div>
            <h1 className="text-3xl font-bold">{modul.judul}</h1>
            <p className="bg-primary px-5 py-1 text-white w-fit rounded-full my-2">
              {modul.asignd_teacher ? modul.asignd_teacher.name : "None"}
            </p>

            <div className="bg-white px-4 py-6 mt-8 rounded-xl">
              <h5 className="font-bold text-xl my-2">{modul.judul}</h5>
              <p className="text-sm">{modul.description}</p>
            </div>
          </div>
          <div>
            {user.roles === "teacher" && (
              <div className="space-y-2 my-2">
                <Link
                  to={`/modul/${id}/create`}
                  className="bg-primary text-white px-3 py-2 space-x-2  text-center rounded-xl  flex justify-center items-center text-sm "
                >
                  <FaPlus />
                  <span>Add Task</span>
                </Link>
                <HapusModul id={id as string} />
              </div>
            )}
          </div>
        </section>

        {subModul && subModul.length > 0 ? (
          renderDateHeader(subModul).map((item, index) => (
            <section key={index} className="mt-6">
              {item.dateHeader && (
                <h3 className="font-bold text-[#737373]">{item.dateHeader}</h3>
              )}
              {item.modul.type === "material" && (
                <Link to={`materi/${item.modul.id}`} replace={false}>
                  <Materi subModul={item.modul} />
                </Link>
              )}
              {item.modul.type === "assignment" && (
                <Link to={`assignment/${item.modul.id}`} replace={false}>
                  <Tugas subModul={item.modul} />
                </Link>
              )}
              {user.roles === "teacher" && (
                <div className="flex space-x-2">
                  <Link
                    to={`/modul/${id}/edit/${item.modul.id}`}
                    className="text-blue-500 hover:underline"
                  >
                    Edit
                  </Link>
                  <HapusSubModul id={item.modul.id} />
                </div>
              )}
            </section>
          ))
        ) : (
          <div className="mt-12">Belum ada Task yang ditambahkan</div>
        )}
      </main>
    </>
  );
};

export default SubModul;