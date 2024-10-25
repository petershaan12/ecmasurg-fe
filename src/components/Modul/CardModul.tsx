import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

type CardModulProps = {
  modul: {
    id: number;
    judul: string;
    gambar_modul: string;
    submodules_count: number;
    asignd_teacher: {
      id: number;
      name: string;
    };
  };
};

const CardModul = ({ modul }: CardModulProps) => {
  return (
    <div className="md:w-[300px] h-[300px] relative w-full  drop-shadow ">
      {modul.gambar_modul ? (
        <img
          src={`${process.env.REACT_PUBLIC_API_KEY}/storage/modul/${modul.gambar_modul}`}
          alt="Card Modul"
          width={300}
          height={40}
          className="h-[150px] w-full object-cover rounded-xl"
        />
      ) : (
        <div className="h-[150px] w-full object-cover rounded-xl bg-primary"></div>
      )}

      <div className="absolute left-0 bg-white rounded-xl p-5 -mt-10 md:w-[300px] w-full">
        <h1 className="md:text-xl font-bold">{modul.judul}</h1>
        <div className="flex items-center">
          <img
            src="/icons/teach.svg"
            alt="24 Course"
            width={20}
            height={20}
            className="w-[20px] h-[20px] md:w-[40px] md:h-[40px]"
          />
          <p className="text-sm md:text-base">
            {modul.submodules_count} Course
          </p>
        </div>
        <div className="md:flex mt-5 justify-between text-xs md:text-base">
          <p className="text-sm">{modul.asignd_teacher.name}</p>
          <Link
            to={`/modul/${modul.id}`}
            className="flex items-center space-x-2 hover:underline text-xs md:text-base"
          >
            lihat <ArrowRight />{" "}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CardModul;
