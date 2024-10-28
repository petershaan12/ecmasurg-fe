import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import MenuSamping from "../components/MenuSamping";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

interface RootState {
  data: any;
  loading: boolean;
  error: Error | null;
}

const Home = () => {
  const user = useSelector((state: RootState) => state.data);
  const [belumLengkap, setBelumLengkap] = useState<boolean>(true);

  useEffect(() => {
    if (user) {
      const isComplete =
        user.name &&
        user.email &&
        user.gender &&
        user.phone_number &&
        user.biografi &&
        user.dateof_birth &&
        user.photo_profile;

      setBelumLengkap(!isComplete);
    }
  }, [user]);

  return (
    <>
      <header className="flex justify-between items-center">
        <p className="md:text-xl">
          <b>Hello {user?.name ?? "Guest"},</b> Welcome Back 👋
        </p>
        <MenuSamping />
      </header>

      <main className="mt-6">
        <section className="grid md:grid-cols-4 gap-12 justify-between items-start">
          <div className="md:col-span-3">
            <div className="flex items-center space-x-8 ">
              <img src="/logo.png" height={200} width={200} alt="Otak" />
              <h1
                className="md:text-2xl text-xl font-bold"
                style={{ lineHeight: "1.8" }}
              >
                E-msaec <br /> Virtual Learning <br /> Environment
              </h1>
            </div>

            <section className="mt-10">
              <div id="activity">
                <h1 className="text-xl mb-5">Your Activity </h1>
                <div className=" grid grid-cols-2 md:grid-cols-3 gap-5">
                  <div
                    className="bg-[#8CE065] flex flex-col justify-between rounded-xl pl-6 py-4 text-white md:w-48 lg:w-full "
                    style={{
                      backgroundImage: "url(/icons/course-bg.png)", // sesuaikan path gambarnya
                      backgroundSize: "cover",
                      backgroundRepeat: "no-repeat",
                      backgroundPosition: "left",
                      backgroundPositionX: "60px",
                    }}
                  >
                    <img
                      src="/icons/course.svg"
                      width={30}
                      height={30}
                      alt="learn icon"
                    />
                    <div className="mt-5">
                      <h1 className="text-4xl font-bold drop-shadow-lg">1</h1>
                      <p className="text-lg">Course</p>
                      <Link to="/modul" className="flex flex-col items-end">
                        <hr className="mt-5 w-[150px] " />
                        <p className="mt-3 bg-[#5CCC37] hover:bg-green-600  text-white py-1 px-3 rounded-lg mr-2">
                          Lihat Course
                        </p>
                      </Link>
                    </div>
                  </div>
                  <div
                    className="bg-[#F9A685] flex flex-col justify-between rounded-xl pl-6 py-4 text-white md:w-48 lg:w-full  "
                    style={{
                      backgroundImage: "url(/icons/gamepad-bg.png)", // sesuaikan path gambarnya
                      backgroundSize: "cover",
                      backgroundRepeat: "no-repeat",
                      backgroundPosition: "left",
                      backgroundPositionX: "60px",
                    }}
                  >
                    <img
                      src="/icons/gamepad.svg"
                      width={30}
                      height={30}
                      alt="learn icon"
                    />
                    <div className="mt-5">
                      <h1 className="text-4xl font-bold drop-shadow-lg">0</h1>
                      <p className="text-lg">Games</p>
                      <div className="flex flex-col items-end">
                        <hr className="mt-5 w-[150px] " />
                        <p className="mt-3 bg-[#EC4D36] hover:bg-orange-600  text-white py-1 px-3 rounded-lg mr-2 ">
                          Lihat Games
                        </p>
                      </div>
                    </div>
                  </div>
                  <div
                    className="bg-[#39C2E7] flex flex-col justify-between rounded-xl pl-6 py-4 text-white md:w-48 lg:w-full "
                    style={{
                      backgroundImage: "url(/icons/trophy-bg.png)", // sesuaikan path gambarnya
                      backgroundSize: "cover",
                      backgroundRepeat: "no-repeat",
                      backgroundPosition: "left",
                      backgroundPositionX: "60px",
                    }}
                  >
                    <img
                      src="/icons/trophy.svg"
                      width={30}
                      height={30}
                      alt="learn icon"
                    />
                    <div className="mt-5">
                      <h1 className="text-4xl font-bold drop-shadow-lg">0</h1>
                      <p className="text-lg">Trophy</p>
                      <div className="flex flex-col items-end">
                        <hr className="mt-5 w-[150px] " />
                        <p className="mt-3 bg-[#009BD8] hover:bg-blue-600  text-white py-1 px-3 rounded-lg mr-2">
                          Lihat Trophy
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <h1 className="text-xl mb-5 mt-8">Your Documents </h1>
              <div className="bg-white flex space-x-5 items-center  justify-between px-5 py-3 rounded-2xl h-[100px] relative">
                <div className="flex space-x-5 items-center">
                  <div className="bg-[#D4FFDA] p-2 rounded-2xl">
                    <img
                      src="/icons/submission.svg"
                      width={40}
                      height={40}
                      alt="submission icon"
                    />
                  </div>
                  <div>
                    <h5 className="font-bold ">Submission NLP Programming</h5>
                    <p className="mt-1 font-light text-xs">04 Jan, 09:20AM</p>
                  </div>
                </div>
                <Badge className="bg-[#AFEF86] text-[#272835] hover:bg-green-900 hover:text-white font-bold py-1 px-3 text-xs">
                  Submitted
                </Badge>
              </div>
            </section>
          </div>

          <div className="md:col-span-1">
            {belumLengkap && (
              <div className="bg-[#2E3C7E] p-5 text-white mt-8 rounded-2xl">
                <h1 className="text-xl mb-5 font-medium">
                  Data Diri Kamu Belum Lengkap
                </h1>
                <p className="text-sm">
                  Silahkan Isi Data Diri Kamu dan Lengkapi untuk pendataan kamu
                  dalam modul pembelajaran ini
                </p>
                <div className="text-end">
                  <Button className="bg-white text-primary py-2 px-5 mt-5 text-end hover:bg-white/20 hover:text-white">
                    <Link to="/profile/edit">ISI SEKARANG</Link>
                  </Button>
                </div>
              </div>
            )}
            <div className="mt-5">
              <h1 className="text-xl mb-5 text-center">About Us </h1>

              <div className=" bg-white rounded-3xl px-8 pt-10 py-5">
                <h1 className="text-xl font-bold">
                  Tempat pembelajaran interaktif{" "}
                  <span className="text-primary">Ecmasurg</span> Hadir untuk
                  kalian
                </h1>
                <p className="mt-5 text-sm">
                  Ecmasurg adalah platform pembelajaran interaktif yang
                  dirancang khusus untuk mendukung mahasiswa dan profesional
                  kesehatan dalam memahami konsep mendalam tentang sistem
                  muskulosektual dan disiplin terkait ilmu bedah.
                </p>
                <img
                  src="/learn-teacher.png"
                  width={400}
                  height={400}
                  alt="Ecmasurg"
                />
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default Home;
