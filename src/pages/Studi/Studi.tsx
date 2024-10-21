import MenuSamping from "../../components/MenuSamping";
import Posting from "./Posting";

const Studi = () => {
  return (
    <>
      <header className="flex justify-between items-center">
        <div className="flex space-x-5">
          <h1 className="md:text-2xl font-bold">Studi Kasus</h1>
        </div>
        <MenuSamping />
      </header>

      <main className="mt-8 grid grid-cols-1 md:grid-cols-4 space-x-5">
        <div className="md:col-span-3">
          <Posting />
        </div>
        <div
          id="trending"
          className="md:col-span-1 bg-primary rounded-2xl px-4 py-5 text-white" // Kolom 1/4
        >
          <h1 className="text-lg font-semibold">Trending</h1>
          <ul className="text-sm space-y-2 mt-4">
            <li className="flex items-center">
              <span className="mr-2">&gt;</span>
              <a href="#" className="hover:text-blue-500 hover:underline">
                Terobosan Baru dalam Pengobatan Penyakit Langka
              </a>
            </li>
            <li className="flex items-center">
              <span className="mr-2">&gt;</span>
              <a href="#" className="hover:text-blue-500 hover:underline">
                Kaitan Antara Gaya Hidup Sedentary dan Risiko Penyakit Kronis
              </a>
            </li>
            <li className="flex items-center">
              <span className="mr-2">&gt;</span>
              <a href="#" className="hover:text-blue-500 hover:underline">
                Munculnya Varian Baru Virus
              </a>
            </li>
            <li className="flex items-center">
              <span className="mr-2">&gt;</span>
              <a href="#" className="hover:text-blue-500 hover:underline">
                Pentingnya Vaksinasi untuk Anak-anak
              </a>
            </li>
            <li className="flex items-center">
              <span className="mr-2">&gt;</span>
              <a href="#" className="hover:text-blue-500 hover:underline">
                Dampak Pandemi COVID-19 terhadap Kesehatan Mental
              </a>
            </li>
          </ul>
        </div>
      </main>
    </>
  );
};

export default Studi;
