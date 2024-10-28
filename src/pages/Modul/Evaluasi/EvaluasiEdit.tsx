import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import MenuSamping from "@/components/MenuSamping";
import EditEvaluasi from "@/components/Modul/EditEvaluasi";
import { useEffect, useState } from "react";
import axios from "axios";
import Loading from "@/components/Loading";
import { toast } from "sonner";
import { useSelector } from "react-redux";

const EvaluasiEdit = () => {
  const { id, idevaluasi } = useParams<{ id: string; idevaluasi: string }>();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
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

  const isEvaluasiOwner =
    user.roles === "teacher" && evaluasi.modul.asignd_teacher === user.id;

  if (!isEvaluasiOwner) {
    console.log("Not authorized to edit this evaluasi");
    return <Navigate to="/404" />;
  }

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
          <h1 className="text-xl font-bold">Edit Evaluasi</h1>
        </div>
        <MenuSamping />
      </header>

      <main className="grid md:grid-cols-4 grid-cols-1 gap-8 mt-8">
        <section className="md:col-start-1 md:col-end-3 ">
          <EditEvaluasi evaluasi={evaluasi} />
        </section>
        <section className="md:col-end-5">
          <div className="bg-primary rounded-xl p-5 text-white text-center space-y-6 flex flex-col items-center">
            <h1>Tutorial Input Evaluasi</h1>
            <Link to="/modul/tutorial">
              <p className="bg-white px-3 py-1 text-black rounded-xl w-fit ">
                Tonton Sekarang
              </p>
            </Link>
          </div>
        </section>
      </main>
    </>
  );
};

export default EvaluasiEdit;
