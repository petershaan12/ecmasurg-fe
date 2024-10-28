import { format } from "date-fns";

type EvaluasiProps = {
  evaluasi: {
    title: string;
    time: string;
  };
};

const Evaluasi = ({ evaluasi }: EvaluasiProps) => {
  const formattedDate = format(new Date(evaluasi.time), "d MMM, h:mma");
  return (
    <div className="flex space-x-5 items-center mt-5">
      <div className="bg-[#FDFF79] p-3 rounded-2xl w-[60px]">
        <img
          src="/icons/happy.svg"
          width={40}
          height={40}
          alt="submission icon"
        />
      </div>
      <div>
        <h3 className="font-bold hover:underline">{evaluasi.title}</h3>
        <p className="opacity-50">{formattedDate}</p>
      </div>
    </div>
  );
};

export default Evaluasi;
