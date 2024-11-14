import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import MenuSamping from "@/components/MenuSamping";
import { ArrowLeft } from "lucide-react";

import { useSelector } from "react-redux";
import { toast } from "sonner";
import Loading from "@/components/Loading";
import StudentSubmit from "@/components/Modul/StudentSubmit";
import Cookies from "js-cookie";

type Assignment = {
  length: number;
  id: string;
  idsubmodul: string;
  judul: string;
  deadline: string;
  description: string;
  link_video: string;
  modul_judul: string;
  files: string[];
  map: (arg0: (file: any, index: number) => JSX.Element) => JSX.Element[];
};

const AssignmentSubmit = () => {
  const { id, idsubmodul } = useParams<{ id: string; idsubmodul: string }>();
  const user = useSelector((state: any) => state.data);
  const [tugas, setTugas] = useState<Assignment | null>(null);

  const navigate = useNavigate();

  const fetchTugas = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_PUBLIC_API_KEY}/api/modul/${id}/show/${idsubmodul}`,
        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
        }
      );

      const data = response.data.data;
      if (typeof data.files === "string") {
        data.files = JSON.parse(data.files);
      }

      setTugas(data);
    } catch (err) {
      toast.error("Gagal memuat tugas kamu.");
      console.error(err);
    }
  };

  useEffect(() => {
    fetchTugas();
  }, [id, idsubmodul]);

  if (!tugas) {
    return <Loading />;
  }

  return (
    <>
      <header className="flex justify-between">
        <div className="flex space-x-5 items-center">
          <button onClick={() => navigate(-1)}>
            <ArrowLeft className="hover:bg-primary/20 rounded-full" />
          </button>
          <h1 className="text-base">
            <Link to="/modul" className="hover:underline">
              Modul Pembelajaran
            </Link>{" "}
            /{" "}
            <Link to={`/home/modul/${id}`} className="hover:underline">
              {tugas.modul_judul}
            </Link>
            / {tugas.judul}
          </h1>
        </div>
        <MenuSamping />
      </header>

      <main className="mt-8">
        <h1 className="text-2xl font-bold">{tugas.judul}</h1>
        <p className="text-sm">
          Deadline Submission{" "}
          <b>
            {new Date(tugas.deadline).toLocaleString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
              hour: "numeric",
              minute: "numeric",
              hour12: true,
            })}
          </b>{" "}
        </p>
        {/* Student akan Melihat */}
        {user.roles === "user" && (
          <StudentSubmit id={id} idsubmodul={idsubmodul} userid={user.id} />
        )}
      </main>
    </>
  );
};

export default AssignmentSubmit;
