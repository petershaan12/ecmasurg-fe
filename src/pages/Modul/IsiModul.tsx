import { ArrowLeft } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import MenuSamping from "../../components/MenuSamping";
import Materi from "../../components/Modul/Materi";
import Tugas from "../../components/Modul/Tugas";

const IsiModul = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  return (
    <>
      <header className="flex justify-between">
        <div className="flex space-x-5 items-center">
          <button
            onClick={() => {
              navigate(-1);
            }}
          >
            <ArrowLeft />
          </button>
          <h1 className="text-base">Modul Pembelajaran / Sistem Pensarafan</h1>
        </div>
        <MenuSamping />
      </header>

      <main className="mt-8 ">
        <h1 className="text-3xl font-bold">Sistem Pensafaran</h1>
        <p className="bg-primary px-5 py-1 text-white w-fit rounded-full my-2">
          Evelyn H. Tambunan, Ph.D NED
        </p>

        <div className="bg-white px-4 py-6 mt-8 rounded-xl">
          <h5 className="font-bold text-xl my-2">Sistem Pensarafan</h5>
          <p className="text-sm">
            Sistem pensafaran adalah mekanisme pengiriman data yang melibatkan
            tahap-tahap penting dalam komunikasi digital, seperti enkapsulasi,
            pengiriman, penerimaan, dan dekripsi data. Data yang dikirim dipecah
            menjadi paket-paket kecil, yang kemudian diberi informasi tambahan
            seperti alamat pengirim, penerima, serta instruksi pengurutan
            kembali. Setelah paket-paket ini mencapai tujuan, mereka dirakit
            kembali menjadi data utuh. Sistem ini memastikan bahwa data dapat
            dikirim melalui berbagai jalur dan tetap sampai dengan aman dan
            utuh, meskipun ada hambatan dalam jaringan.{" "}
          </p>
        </div>

        <section className="mt-6 ">
          <h3 className="font-bold text-[#737373]">
            Selasa, 24 September 2024
          </h3>
          <Materi />
          <Tugas />
        </section>
      </main>
    </>
  );
};

export default IsiModul;
