import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import OurServices from "./components/Landing/our-services";
import ClientSreview from "./components/Landing/clientsreview";
import Footer from "./components/Landing/footer";
import { motion } from "framer-motion";
import { useTypewriter } from "react-simple-typewriter";
import axios from "axios";
import { persistor } from "./redux/store";
import { ArrowUp, LogOut } from "lucide-react";

const Landing = () => {
  const [isLogin, setIsLogin] = useState(false);

  window.addEventListener("scroll", windowScroll);
  useEffect(() => {}, []);

  function windowScroll() {
    const mybutton = document.getElementById("back-to-top");
    if (mybutton != null) {
      if (document.documentElement.scrollTop > 500) {
        mybutton.classList.add("flex");
        mybutton.classList.remove("hidden");
      } else {
        mybutton.classList.add("hidden");
        mybutton.classList.remove("flex");
      }
    }
  }

  const [text] = useTypewriter({
    words: [" Education Media Analyze, Evaluate, and Creative", "E-MSAEC"],
    loop: 20,
    onLoopDone: () => console.log(`Loop completed after 3 runs.`),
  });

  useEffect(() => {
    if (sessionStorage.getItem("token")) {
      setIsLogin(true);
    }
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleLogout = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_PUBLIC_API_KEY}/api/logout`,
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        }
      );

      sessionStorage.removeItem("token");
      if (response.status === 200) {
        persistor.purge();
        window.location.reload();
      } else {
        console.error("Logout failed");
      }
    } catch (error) {
      console.error("An error occurred during logout", error);
    }
  };

  const scrollToSection = (id: any) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div>
      <nav
        className={`absolute w-full top-0 z-50 transition-colors duration-300 bg-transparent py-8
        flex md:justify-between justify-center md:px-44  items-center `}
      >
        <div>
          <motion.img
            layout
            key="logo"
            src="/navbar/logo.svg"
            alt="EduMedSurg"
            width={150}
            height={40}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 100 }}
          />
        </div>

        {isLogin ? (
          <ul className="items-center space-x-5 hidden  text-sm md:flex">
            <li>
              <button
                className="text-white  rounded-md"
                onClick={() => scrollToSection("about")}
              >
                About
              </button>
            </li>
            <li>
              <button
                className="text-white  rounded-md"
                onClick={() => scrollToSection("pelayanan")}
              >
                Pelayanan
              </button>
            </li>
            <li>
              <button
                className="text-white  rounded-md"
                onClick={() => scrollToSection("testi")}
              >
                Testimony
              </button>
            </li>
            <li>
              <Link
                className={`text-white px-4 py-2  rounded-md bg-primary border-2 border-primary`}
                to="/home"
              >
                Beranda
              </Link>
            </li>
            <li>
              <button
                className={`flex items-center text-white
         px-4 py-2  rounded-md border-2 border-white hover:bg-primary/30`}
                onClick={handleLogout}
              >
                <LogOut className="w-4" /> Logout
              </button>
            </li>
          </ul>
        ) : (
          <ul className="items-center space-x-5 hidden  text-sm md:flex">
            <li>
              <button
                className="text-white  rounded-md"
                onClick={() => scrollToSection("about")}
              >
                About
              </button>
            </li>
            <li>
              <button
                className="text-white  rounded-md"
                onClick={() => scrollToSection("pelayanan")}
              >
                Pelayanan
              </button>
            </li>
            <li>
              <button
                className="text-white  rounded-md"
                onClick={() => scrollToSection("testi")}
              >
                Testimony
              </button>
            </li>
            <li>
              <Link
                className={`text-white px-4 py-2  rounded-md bg-primary border-2 border-primary`}
                to="/login"
              >
                Login
              </Link>
            </li>
            <li>
              <Link
                className={`text-white
           px-4 py-2  rounded-md border-2 border-white hover:bg-primary/30`}
                to="/signup"
              >
                Sign Up
              </Link>
            </li>
          </ul>
        )}
      </nav>

      <section
        className="py-36 lg:py-56 w-full table relative bg-[url('../public/landing/bg.jpg')] bg-top bg-no-repeat bg-cover"
        id="home"
      >
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/75 to-slate-950/50"></div>
        <div className="container relative text-center  mx-auto text-white px-24 md:px-0">
          <h3 className="font-semibold leading-normal text-lg md:text-3xl mb-5 mt-10">
            Welcome to {text}
          </h3>
          <p className="text-slate-300 text-sm md:text-lg max-w-xl mx-auto">
            Explore the world of knowledge with E-MSAEC, your all-in-one
            platform for an enhanced educational experience with Moodle.
          </p>
          <div className="mt-8 space-x-5">
            {isLogin ? (
              <Link
                to="/home/modul"
                className="py-3 px-8 inline-block font-medium text-base transition-all duration-500 bg-primary hover:bg-primary/80 text-white rounded-lg"
              >
                Mulai Belajar Yuk 🏫
              </Link>
            ) : (
              <Link
                to="/login"
                className="py-3 px-8 inline-block font-medium text-base transition-all duration-500 bg-primary hover:bg-primary/80 text-white rounded-lg"
              >
                Mendaftar Sekarang ✏️
              </Link>
            )}
          </div>
        </div>
      </section>

      <section className="relative px-5 md:px-44 py-12 " id="about">
        <div className="container mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-5">
            <div className="relative w-56 md:w-[300px] max-w-lg mx-auto">
              <img
                src="/landing/about.jpg"
                className="rounded-lg shadow-lg"
                alt="About EMSAEC"
              />
            </div>
          </div>
          <div className="lg:col-span-7">
            <div className="lg:ml-7 text-black">
              <h3 className="text-lg text-center md:text-left md:text-3xl font-bold mb-4 text-primary">
                Tentang E-MSAEC
              </h3>
              <p className="text-black  text-center md:text-left  text-sm md:text-base max-w-2xl">
                E-msaec adalah platform pembelajaran interaktif yang dirancang
                khusus untuk mendukung mahasiswa dan profesional kesehatan dalam
                memahami konsep mendalam tentang sistem muskulosektual dan
                disiplin terkait ilmu bedah.
              </p>
              <div className="mt-8 flex md:justify-start justify-center">
                <Link
                  to="mailto:evelynetambunan@gmail.com"
                  className="py-2 px-5 inline-block font-medium text-base transition-all duration-500 bg-primary text-white rounded-lg"
                >
                  Contact Us
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      <OurServices />
      <ClientSreview />
      <Footer />

      <a
        href="#"
        onClick={scrollToTop}
        id="back-to-top"
        className="back-to-top fixed hidden text-lg rounded-full z-10 bottom-5 end-5 h-9 w-9 text-center bg-primary text-white justify-center items-center shadow-xl border border-white"
      >
        <ArrowUp />
      </a>
    </div>
  );
};

export default Landing;
