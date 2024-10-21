import { Input } from "@/components/ui/input";

const Posting = () => {
  return (
    <>
      <div className="relative">
        <Input
          className="bg-white border-2 border-black rounded-lg h-12 pr-10" // Padding kanan untuk ruang ikon
          placeholder="Posting Studi Kasus"
        />
        <span className="absolute inset-y-0 right-0 flex items-center pr-3">
          {/* Ganti dengan ikon yang Anda inginkan */}
          <img src="/icons/send.svg" alt="paper-plane" />
        </span>
      </div>
    </>
  );
};

export default Posting;
