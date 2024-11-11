import { Button } from "../components/ui/button";
import MenuSamping from "../components/MenuSamping";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import Lottie, { LottieRefCurrentProps } from "lottie-react";
import animationdata from "../../public/Emsaec.json";
import axios from "axios";
import { useTypewriter, Cursor } from "react-simple-typewriter";
import CardModulHorizontal from "@/components/Modul/CardModulHorizontal";
import CustomCard from "@/components/CustomCard";
import { motion } from "framer-motion";

interface RootState {
  data: any;
  loading: boolean;
  error: Error | null;
}

const Home = () => {
  const animateRef = useRef<LottieRefCurrentProps>(null);
  const user = useSelector((state: RootState) => state.data);
  const [belumLengkap, setBelumLengkap] = useState<boolean>(true);

  const [text] = useTypewriter({
    words: [
      "Welcome Back",
      "Selamat datang kembali", // Indonesian
      "Willkommen zurück", // German
      "Maligayang pagbabalik", // Filipino
    ],
    loop: 3,
    onLoopDone: () => console.log(`Loop completed after 3 runs.`),
  });

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

  const [modul, setModul] = useState([]);
  const [loading, setLoading] = useState<Boolean>(false);

  useEffect(() => {
    const fetchModul = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `${process.env.REACT_PUBLIC_API_KEY}/api/modul`,
          {
            headers: {
              Accept: "application/json",
              Authorization: `Bearer ${sessionStorage.getItem("token")}`,
            },
          }
        );

        const json = response.data;
        setModul(json.data);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    fetchModul();
  }, []);

  return (
    <>
      <header className="flex justify-between items-center">
        <p className="md:text-xl">
          <b>Hello 👋 {user?.name ?? "Guest"},</b> <span>{text}</span>
          <Cursor cursorColor="red" />
        </p>
        <MenuSamping />
      </header>

      <main className="mt-6">
        <section className="grid md:grid-cols-4 gap-12 justify-between items-start">
          <div className="md:col-span-3">
            <div className="flex items-center md:w-[500px]">
              <Lottie
                animationData={animationdata}
                lottieRef={animateRef}
                loop={true} // Set loop to true
              />
            </div>

            {/*  */}
            <section className="mt-10">
              <div id="activity">
                <h1 className="text-xl mb-5">Your Activity </h1>
                <div className=" grid grid-cols-2 md:grid-cols-3 gap-5">
                  {["Course", "Games", "Trophy"].map((item, index) => (
                    <motion.div
                      key={item}
                      initial={{ opacity: 0, y: 50 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.5 }}
                    >
                      <CustomCard
                        bgColor={
                          item === "Course"
                            ? "#8CE065"
                            : item === "Games"
                            ? "#F9A685"
                            : "#39C2E7"
                        }
                        bgImage={`/icons/${item.toLowerCase()}-bg.png`}
                        title={item}
                        subtitle={item}
                        linkText={`Lihat ${item}`}
                        linkTo={`/${item.toLowerCase()}`}
                        iconSrc={`/icons/${item.toLowerCase()}.svg`}
                        count={item === "Course" ? 4 : 0}
                        bgButton={
                          item === "Course"
                            ? "#5CCC37"
                            : item === "Games"
                            ? "#EC4D36"
                            : "#009BD8"
                        }
                      />
                    </motion.div>
                  ))}
                </div>
              </div>
            </section>

            <section className="mt-8">
              <h1 className="text-xl mb-5">Courses </h1>
              {loading ? (
                <p>Loading...</p>
              ) : (
                <div className="grid md:grid-cols-2 gap-x-5 gap-y-5">
                  {modul.map((modul: any, index: number) => (
                    <motion.div
                      key={modul.id}
                      initial={{ opacity: 0, x: 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.2 }}
                    >
                      <CardModulHorizontal key={modul.id} modul={modul} />
                    </motion.div>
                  ))}
                </div>
              )}
            </section>
          </div>

          <div className="md:col-span-1">
            {belumLengkap && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1 }}
                className="bg-[#2E3C7E] p-5 text-white mt-8 rounded-2xl"
              >
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
              </motion.div>
            )}
            <div className="mt-5">
              <h1 className="text-xl mb-5 text-center">About Us </h1>

              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }} // Added delay here
                className="bg-white rounded-3xl px-8 pt-10 py-5"
              >
                <h1 className="text-xl font-bold">
                  Tempat pembelajaran interaktif{" "}
                  <span className="text-primary">E-msaec</span> Hadir untuk
                  kalian
                </h1>
                <p className="mt-5 text-sm">
                  E-msaec adalah platform pembelajaran interaktif yang dirancang
                  khusus untuk mendukung mahasiswa dan profesional kesehatan
                  dalam memahami konsep mendalam tentang sistem muskulosektual
                  dan disiplin terkait ilmu bedah.
                </p>
                <motion.img
                  src="/learn-teacher.png"
                  width={400}
                  height={400}
                  alt="Ecmasurg"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 2, delay: 0.5 }} // Added delay here
                />
              </motion.div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default Home;
