const Tugas = () => {
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
        <h3 className="font-bold">Learning Activities</h3>
        <p className="opacity-50">24 Sept, 10:20AM</p>
      </div>
    </div>
  );
};

export default Tugas;
