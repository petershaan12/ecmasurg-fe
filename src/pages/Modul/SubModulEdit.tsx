import { Link, useNavigate, useParams } from "react-router-dom";
import MenuSamping from "../../components/MenuSamping";
import EditSubModul from "@/components/Modul/EditSubModul";
import { ArrowLeft } from "lucide-react";
import { useEffect, useState } from "react";

type subModul = {
  length: number;
  created_at: string;
  id: number;
  judul: string;
  type: string;
  file: string;
  link_video: string;
};

const SubModulEdit = () => {
  const navigate = useNavigate();
  const { id, idsubmodul } = useParams();
  const [loading, setLoading] = useState<boolean>(true);
  const [subModul, setSubModul] = useState<subModul[]>([]);

  const fetchSubModul = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `${process.env.REACT_PUBLIC_API_KEY}/api/modul/${id}/show/${idsubmodul}`,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      const json = await response.json();
      setSubModul(json.data);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    } finally {
    }
  };

  useEffect(() => {
    fetchSubModul();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <header className="flex justify-between">
        <div className="flex space-x-5">
          <button
            onClick={() => {
              navigate(-1);
            }}
          >
            <ArrowLeft />
          </button>
          <h1 className="text-2xl font-bold">Edit Task</h1>
        </div>
        <MenuSamping />
      </header>

      <main className="grid md:grid-cols-4 grid-cols-1 gap-8 mt-8">
        <section className="md:col-start-1 md:col-end-3 ">
          <EditSubModul submodul={subModul} />
        </section>
        <section className="md:col-end-5">
          <div className="bg-primary rounded-xl p-5 text-white text-center space-y-6 flex flex-col items-center">
            <h1>Tutorial Input Modul Pembelajaran</h1>
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

export default SubModulEdit;
