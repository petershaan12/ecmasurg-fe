import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const CardModul = () => {
  return (
    <div className="md:w-[300px] relative drop-shadow">
      <img
        src="/modul-example/modul1.png"
        alt="Card Modul"
        width={300}
        height={40}
      />
      <div className="bg-white rounded-xl p-5 -mt-10 z-10 absolute md:w-[300px] ">
        <h1 className="md:text-xl font-bold">Sistem Muskulosektual</h1>
        <div className="flex items-center">
          <img
            src="/icons/teach.svg"
            alt="24 Course"
            width={20}
            height={20}
            className="w-[20px] h-[20px] md:w-[40px] md:h-[40px]"
          />
          <p className="text-sm md:text-base">24 Course</p>
        </div>
        <div className="md:flex mt-5 justify-between text-xs md:text-base">
          <p>Evelyne Tambunan</p>
          <Link
            to="/modul/5"
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
