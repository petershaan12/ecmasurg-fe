import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import OurServices from "./components/Landing/our-services";
import ClientSreview from "./components/Landing/clientsreview";
import Footer from "./components/Landing/footer";
import { motion } from "framer-motion";
import { useTypewriter } from "react-simple-typewriter";
import axios from "axios";
import { persistor } from "./redux/store";
import { ArrowUp, Home, LogOut, Menu } from "lucide-react";
import { animateScroll as scroll } from "react-scroll";
import About from "./components/Landing/about";
import { Sheet, SheetContent, SheetTrigger } from "./components/ui/sheet";
import { toast } from "sonner";
import { Toaster } from "./components/ui/sonner";

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
    words: [" Education Media Analyze, Evaluate, and Creative", "E-msaec"],
    loop: 2,
    onLoopDone: () => console.log(`Loop completed after 3 runs.`),
  });

  useEffect(() => {
    if (sessionStorage.getItem("token")) {
      setIsLogin(true);
    }
  }, []);

  const scrollToTop = () => {
    scroll.scrollToTop({
      duration: 1000,
      smooth: true,
    });
  };

  const handleLogout = async () => {
    const toastId = toast.loading("Logout...");
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
        toast.success("Berhasil Logout!", {
          id: toastId,
        });
        window.location.reload();
      } else {
        toast.success("Gagal Logout! Periksa Koneksi Anda", {
          id: toastId,
        });
        console.error("Logout failed");
      }
    } catch (error) {
      toast.error("An error occurred during logout.", {
        id: toastId,
      });
      console.error("An error occurred during logout", error);
    }
  };

  const scrollToSection = (id: any) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div>
      <nav
        className={`container mx-auto w-full top-0 z-50 transition-colors duration-300 bg-transparent py-8 px-8
          flex justify-between items-center absolute left-1/2 transform -translate-x-1/2`}
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

        {/* mobile view */}
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger className="border border-white/10 rounded-lg align-middle px-2 py-1">
              <Menu className="text-white" />
            </SheetTrigger>
            <SheetContent className="flex flex-col bg-black/40 backdrop-blur-md md:hidden w-1/2 py-24">
              <ul className="space-y-6 text-center">
                <li>
                  <Link
                    className={`mt-12 flex items-center w-fit text-white text-center px-4 py-2  rounded-md bg-primary border-primary border-2`}
                    to={isLogin ? "/home" : "/login"}
                  >
                    {isLogin ? (
                      <>
                        <Home className="w-4 mr-2" />
                        Beranda
                      </>
                    ) : (
                      <span className="mx-auto">Login</span>
                    )}
                  </Link>
                </li>
                <li>
                  {isLogin ? (
                    <button
                      className={`flex items-center text-white
         px-4 py-2  rounded-md border-2 border-white hover:bg-primary/30`}
                      onClick={handleLogout}
                    >
                      <LogOut className="w-4 mr-2" /> Logout
                    </button>
                  ) : (
                    <Link
                      className={`flex items-center text-white
           px-4 py-2  rounded-md border-2 border-white hover:bg-primary/30`}
                      to="/signup"
                    >
                      <span className="mx-auto">Sign Up</span>
                    </Link>
                  )}
                </li>
              </ul>
            </SheetContent>
          </Sheet>
        </div>

        {/* desktop view */}
        <ul className="items-center space-x-5 hidden  text-sm md:flex">
          <motion.li
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <button
              className="text-white  rounded-md"
              onClick={() => scrollToSection("about")}
            >
              About
            </button>
          </motion.li>
          <motion.li
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <button
              className="text-white  rounded-md"
              onClick={() => scrollToSection("pelayanan")}
            >
              Pelayanan
            </button>
          </motion.li>
          <motion.li
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <button
              className="text-white  rounded-md"
              onClick={() => scrollToSection("testi")}
            >
              Testimony
            </button>
          </motion.li>
          <motion.li
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Link
              className={`flex items-center text-white px-4 py-2  rounded-md bg-primary border-primary border-2`}
              to={isLogin ? "/home" : "/login"}
            >
              {isLogin ? (
                <>
                  <Home className="w-4 mr-2" />
                  Beranda
                </>
              ) : (
                "Login"
              )}
            </Link>
          </motion.li>
          <motion.li
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            {isLogin ? (
              <button
                className={`flex items-center text-white
         px-4 py-2  rounded-md border-2 border-white hover:bg-primary/30`}
                onClick={handleLogout}
              >
                <LogOut className="w-4 mr-2" /> Logout
              </button>
            ) : (
              <Link
                className={`flex items-center text-white
           px-4 py-2  rounded-md border-2 border-white hover:bg-primary/30`}
                to="/signup"
              >
                Sign Up
              </Link>
            )}
          </motion.li>
        </ul>
      </nav>

      <section
        className="py-36 lg:py-56 w-full table relative bg-[url('../public/landing/bg-1.jpg')] bg-top bg-no-repeat bg-cover"
        id="home"
        style={{ backgroundAttachment: "fixed", backgroundPosition: "center" }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/75 to-slate-950/50"></div>
        <div className="container relative text-center  mx-auto text-white px-6 md:px-0">
          <h3 className="font-semibold leading-normal text-lg md:text-3xl mb-5 mt-10">
            Welcome to {text}
          </h3>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-slate-300 text-sm md:text-lg max-w-xl mx-auto"
          >
            Explore the world of knowledge with E-msaec, your all-in-one
            platform for an enhanced educational experience with Moodle.
          </motion.p>
          <div className="mt-8 space-x-5">
            {isLogin ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Link
                  to="/home/modul"
                  className="py-3 px-8 inline-block font-medium text-base transition-all duration-500 bg-primary hover:bg-primary/80 text-white rounded-lg"
                >
                  Mulai Belajar Yuk 🏫
                </Link>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Link
                  to="/signup"
                  className="py-3 px-8 inline-block font-medium text-base transition-all duration-500 bg-primary hover:bg-primary/80 text-white rounded-lg"
                >
                  Mendaftar Sekarang ✏️
                </Link>
              </motion.div>
            )}
          </div>
        </div>
      </section>

      <About />
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

      <Toaster />
    </div>
  );
};

export default Landing;
