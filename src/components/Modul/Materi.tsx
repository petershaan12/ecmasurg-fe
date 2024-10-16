const Materi = () => {
  return (
    <div className="flex space-x-5 items-center mt-5">
      <div className="bg-[#FFD4D5] p-4 rounded-2xl w-[60px]">
        <img
          src="/icons/materi.svg"
          width={40}
          height={40}
          alt="submission icon"
        />
      </div>
      <div>
        <h3 className="font-bold">
          Materi 1: Pengantar Anatomi dan Fisiologi Sistem Persarafan
        </h3>
        <p className="opacity-50">24 Sept, 10:20AM</p>
      </div>
    </div>
  );
};

export default Materi;
