import React, { useState, useEffect } from "react";
import Loading from "@/components/Loading";
import MenuSamping from "@/components/MenuSamping";
import axios from "axios";
import { ArrowLeft } from "lucide-react";
import { useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import EvaluasiStudent from "@/components/Modul/EvaluasiStudent";
import EvaluasiTeacher from "@/components/Modul/EvaluasiTeacher";

const EvaluasiPage: React.FC = () => {
  const { id, idevaluasi } = useParams<{ id: string; idevaluasi: string }>();
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const user = useSelector((state: any) => state.data);
  const [evaluasi, setEvaluasi] = useState<any>({});

  useEffect(() => {
    const fetchEvaluasi = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `${process.env.REACT_PUBLIC_API_KEY}/api/modul/evaluasi/${id}/show/${idevaluasi}`,
          {
            headers: {
              Accept: "application/json",
              Authorization: `Bearer ${sessionStorage.getItem("token")}`,
            },
          }
        );
        setEvaluasi(response.data.data);
      } catch (error) {
        toast.error("Failed to fetch Evaluasi.");
      } finally {
        setLoading(false);
      }
    };

    fetchEvaluasi();
  }, []);

  if (loading) return <Loading />;

  return (
    <>
      <header className="flex justify-between">
        <div className="flex space-x-5 items-center">
          <button onClick={() => navigate(-1)}>
            <ArrowLeft className="hover:bg-primary/20 rounded-full" />
          </button>
          <h1 className="text-base flex items-center">
            <Link to="/modul" className="hover:underline">
              Modul Pembelajaran
            </Link>
            /
            <Link
              to={`/home/modul/${evaluasi.modul.id}`}
              className="hover:underline"
            >
              <span>{evaluasi.modul.judul}</span>
            </Link>
            / <span>{evaluasi.title}</span>
          </h1>
        </div>
        <MenuSamping />
      </header>

      <main className="mt-8">
        <h1 className="text-2xl font-bold">{evaluasi.title}</h1>
        <p className="text-sm">
          Deadline Submission{" "}
          <b>
            {new Date(evaluasi.deadline).toLocaleString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
              hour: "numeric",
              minute: "numeric",
              hour12: true,
            })}
          </b>
        </p>

        {/* Form Section */}
        {user.roles === "user" && (
          <EvaluasiStudent
            evaluasi={evaluasi}
            idmodul={id}
            idevaluasi={idevaluasi}
          />
        )}
        {user.roles === "teacher" && (
          <EvaluasiTeacher idmodul={id} idevaluasi={idevaluasi} />
        )}
      </main>
    </>
  );
};

export default EvaluasiPage;
