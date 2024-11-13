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

const CardModulHorizontal = ({ modul }: CardModulProps) => {
  return (
    <div className="w-full h-[200px] relative flex drop-shadow-sm">
      {modul.gambar_modul ? (
        <img
          src={`${process.env.REACT_PUBLIC_API_KEY}/storage/modul/${modul.gambar_modul}`}
          alt="Card Modul"
          width={200}
          height={150}
          className="md:h-[200px] md:w-[160px] w-[100px]  object-cover rounded-l-xl"
        />
      ) : (
        <div className="h-[200px] w-[160px] object-cover rounded-l-xl bg-primary"></div>
      )}

      <div className="w-full bg-white rounded-r-xl p-5 flex flex-col justify-between">
        <h1 className=" font-bold mb-2 ">{modul.judul}</h1>
        <div className="flex items-center space-x-2 mb-3">
          <img
            src="/icons/teach.svg"
            alt="Course Icon"
            width={20}
            height={20}
            className="w-[20px] h-[20px]"
          />
          <p className="text-sm">{modul.total_count} Course</p>
        </div>
        <div className="flex justify-between w-full text-sm md:text-base">
          <p className="text-sm">{modul.asignd_teacher.name}</p>
          <Link
            to={`/modul/${modul.id}`}
            className="flex items-center space-x-2 hover:underline text-xs md:text-base"
          >
            lihat <ArrowRight />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CardModulHorizontal;
