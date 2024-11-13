import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

type CardModulProps = {
  modul: {
    id: number;
    judul: string;
    gambar_modul: string;
    total_count: number;
    asignd_teacher: {
      id: number;
      name: string;
    };
  };
};

const CardModul = ({ modul }: CardModulProps) => {
  return (
    <div className="w-full md:w-[300px] relative drop-shadow-lg flex flex-col items-center">
      {modul.gambar_modul ? (
        <img
          src={`${process.env.REACT_PUBLIC_API_KEY}/storage/modul/${modul.gambar_modul}`}
          alt="Card Modul"
          width={300}
          height={150}
          className="h-[200px] w-full object-cover rounded-t-xl"
        />
      ) : (
        <div className="h-[200px] w-full object-cover rounded-t-xl bg-primary"></div>
      )}

      <div className="w-full bg-white rounded-b-xl p-5 flex flex-col items-start">
        <h1 className="text-lg font-bold mb-2">{modul.judul}</h1>
        <div className="flex items-center space-x-2 mb-3">
          <img
            src="/icons/teach.svg"
            alt="Course Icon"
            width={20}
            height={20}
            className="w-[20px] h-[20px]"
          />
          <p className="text-sm md:text-base">{modul.total_count} Course</p>
        </div>
        <div className="flex justify-between w-full text-xs md:text-base">
          <p className="text-sm">{modul.asignd_teacher.name}</p>
          <Link
            to={`${modul.id}`}
            className="flex items-center space-x-2 hover:underline text-xs md:text-base"
          >
            lihat <ArrowRight />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CardModul;
