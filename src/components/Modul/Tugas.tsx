import { format } from "date-fns";

type MateriProps = {
  subModul: {
    judul: string;
    created_at: string;
    time: string;
  };
};

const Tugas = ({ subModul }: MateriProps) => {
  const formattedDate = format(new Date(subModul.time), "d MMM, h:mma");

  return (
    <div className="flex space-x-5 items-center mt-5">
      <div className="bg-[#D4FFDA] p-3 rounded-2xl w-[60px]">
        <img
          src="/icons/submission.svg"
          width={40}
          height={40}
          alt="submission icon"
        />
      </div>
      <div>
        <h3 className="font-bold hover:underline">{subModul.judul}</h3>
        <p className="opacity-50">{formattedDate}</p>
      </div>
    </div>
  );
};

export default Tugas;
