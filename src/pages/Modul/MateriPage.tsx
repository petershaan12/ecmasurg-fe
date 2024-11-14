import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import MenuSamping from "@/components/MenuSamping";
import { ArrowLeft } from "lucide-react";
import { toast } from "sonner";
import Loading from "@/components/Loading";
import Cookies from "js-cookie";

type Materi = {
  id: string;
  idsubmodul: string;
  judul: string;
  description: string;
  link_video: string;
  modul_judul: string;
  files: string[]; // Update this to hold an array of strings
};

const MateriPage = () => {
  const { id, idsubmodul } = useParams<{ id: string; idsubmodul: string }>();
  const [materi, setMateri] = useState<Materi | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMateri = async () => {
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

        // Parse the files string into an array
        const data = response.data.data;
        if (typeof data.files === "string") {
          data.files = JSON.parse(data.files);
        }

        setMateri(data);
      } catch (err) {
        toast.error("Gagal memuat materi.");
        console.error(err);
      }
    };

    fetchMateri();
  }, [id, idsubmodul]);

  if (!materi) {
    return <Loading />;
  }

  const getEmbedUrl = (url: string) => {
    const videoIdMatch = url.match(
      /(?:youtu\.be\/|youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=))([^&\n]{11})/
    );
    return videoIdMatch
      ? `https://www.youtube.com/embed/${videoIdMatch[1]}`
      : "";
  };

  console.log(materi);

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
          <h1 className="text-base text-ellipsis overflow-hidden md:w-full w-28">
            <Link to="/modul" className="hover:underline">
              Modul Pembelajaran
            </Link>{" "}
            /{" "}
            <Link to={`/home/modul/${id}`} className="hover:underline">
              {materi.modul_judul}
            </Link>
            / {materi.judul}
          </h1>
        </div>
        <MenuSamping />
      </header>

      <main className="mt-8 ">
        <h1 className="text-2xl font-bold">{materi.judul}</h1>

        {/* Youtube Link kalau ada */}
        {materi.link_video && getEmbedUrl(materi.link_video) ? (
          <iframe
            width="100%"
            height="315"
            src={getEmbedUrl(materi.link_video)} // Use the function to convert to embed URL
            title={materi.judul}
            frameBorder="0"
            allowFullScreen
            className="mt-2 rounded-xl"
          ></iframe>
        ) : (
          <div className="text-gray-500 mt-2">Video Tidak Tersedia.</div>
        )}

        <div className="bg-white  p-5 rounded-lg shadow mt-5">
          <h2 className="text-lg font-semibold">{materi.judul}</h2>
          <p className="mt-2">{materi.description}</p>

          {/* Jika ada file, berikan list link untuk mendownload */}
          {materi.files && materi.files.length > 0 && (
            <div className="mt-4">
              <h2 className="text-gray-400 font-semibold">
                Download File disini
              </h2>
              <ul className="list-disc list-inside mt-2 pl-5">
                {materi.files.map((file, index) => (
                  <li key={index}>
                    <a
                      href={`${process.env.REACT_PUBLIC_API_KEY}/storage/files/${file}`} // Adjust the URL as necessary
                      className=" underline"
                      download
                    >
                      {file}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </main>
    </>
  );
};

export default MateriPage;
