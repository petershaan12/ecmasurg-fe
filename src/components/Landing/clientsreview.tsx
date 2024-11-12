import image from "../../../public/landing/client/01.jpg";
import image2 from "../../../public/landing/client/02.jpg";
import image4 from "../../../public/landing/client/03.jpg";
import { Link } from "react-router-dom";

export default function ClientSreview() {
  return (
    <>
      <section
        className="relative md:py-24 py-16 px-8 md:px-32 dark:bg-slate-800"
        id="testi"
      >
        <div className="container">
          <div className="grid grid-cols-1 pb-8 text-center">
            <h3 className="mb-6 text-lg md:text-3xl font-bold text-primary">
              ❓ Apa Kata Mereka Tentang EMSAEC ❓
            </h3>
            <p className="text-black text-sm md:text-base max-w-xl mx-auto">
              Temukan bagaimana EMSAEC membantu dalam mengembangkan keterampilan
              HOTS.
            </p>
          </div>

          <div className="grid lg:grid-cols-3  grid-cols-1 mt-8 gap-[30px]">
            <ul className="space-y-8">
              <li className="rounded-lg shadow-lg p-6 bg-white ">
                <div className="flex items-center pb-6 border-b border-gray-100 dark:border-gray-800">
                  <img
                    src={image}
                    className="h-16 w-16 rounded-full shadow"
                    alt=""
                  />
                  <div className="ps-4">
                    <Link
                      to=""
                      className="text-lg h5 text-primary duration-500 ease-in-out"
                    >
                      Alex Pratama
                    </Link>
                    <p className="text-black">Mahasiswa Keperawatan</p>
                  </div>
                </div>
                <div className="mt-6">
                  <p className="text-black">
                    EMSAEC sangat membantu saya memahami materi melalui studi
                    kasus interaktif dan latihan kreatif.
                  </p>
                  <ul className="list-none mb-0 text-amber-400 mt-2">
                    {[...Array(5)].map((_, i) => (
                      <li key={i} className="inline">
                        <i className="mdi mdi-star"></i>
                      </li>
                    ))}
                  </ul>
                </div>
              </li>
            </ul>

            <ul className="space-y-8 hidden sm:block">
              <li className="rounded-lg shadow-lg p-6 bg-white ">
                <div className="flex items-center pb-6 border-b border-gray-100 ">
                  <img
                    src={image2}
                    className="h-16 w-16 rounded-full shadow"
                    alt=""
                  />
                  <div className="ps-4">
                    <Link
                      to=""
                      className="text-lg h5 text-primary duration-500 ease-in-out"
                    >
                      Dina Arumsari
                    </Link>
                    <p className="text-black">Instruktur Keperawatan</p>
                  </div>
                </div>
                <div className="mt-6">
                  <p className="text-black">
                    Platform EMSAEC memudahkan saya untuk merancang aktivitas
                    pembelajaran berbasis HOTS yang menarik dan mudah dipahami.
                  </p>
                  <ul className="list-none mb-0 text-amber-400 mt-2">
                    {[...Array(5)].map((_, i) => (
                      <li key={i} className="inline">
                        <i className="mdi mdi-star"></i>
                      </li>
                    ))}
                  </ul>
                </div>
              </li>
            </ul>

            <ul className="space-y-8 hidden lg:block">
              <li className="rounded-lg shadow-lg p-6 bg-white ">
                <div className="flex items-center pb-6 border-b border-gray-100 dark:border-gray-800">
                  <img
                    src={image4}
                    className="h-16 w-16 rounded-full shadow"
                    alt=""
                  />
                  <div className="ps-4">
                    <Link
                      to=""
                      className="text-lg h5 text-primary duration-500 ease-in-out"
                    >
                      Reza Santoso
                    </Link>
                    <p className="text-black">Alumni</p>
                  </div>
                </div>
                <div className="mt-6">
                  <p className="text-black">
                    Dengan EMSAEC, saya bisa mengasah kemampuan analisis dan
                    evaluasi lebih baik melalui beragam skenario yang
                    ditawarkan.
                  </p>
                  <ul className="list-none mb-0 text-amber-400 mt-2">
                    {[...Array(5)].map((_, i) => (
                      <li key={i} className="inline">
                        <i className="mdi mdi-star"></i>
                      </li>
                    ))}
                  </ul>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}
