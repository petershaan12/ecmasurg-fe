import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

const Landing = () => {
  const [navbarBg, setNavbarBg] = useState(false);

  const changeNavbarBg = () => {
    if (window.scrollY >= 80) {
      setNavbarBg(true);
    } else {
      setNavbarBg(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", changeNavbarBg);
    return () => {
      window.removeEventListener("scroll", changeNavbarBg);
    };
  }, []);

  return (
    <div>
      <nav
        className={`fixed w-full top-0 z-50 transition-colors duration-300 ${
          navbarBg ? "bg-white shadow-md" : "bg-transparent"
        } flex justify-between px-32 py-8`}
      >
        <div>
          <h3
            className={`${
              navbarBg ? "text-gray-800" : "text-white"
            } text-2xl font-bold`}
          >
            EMSAEC
          </h3>
        </div>
        <ul className="flex items-center space-x-5">
          <li>
            <Link
              className={`${
                navbarBg ? "text-gray-800" : "text-white"
              } hover:text-violet-600`}
              to="#home"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              className={`${
                navbarBg ? "text-gray-800" : "text-white"
              } hover:text-violet-600`}
              to="#about"
            >
              About
            </Link>
          </li>
        </ul>
      </nav>

      <section
        className="py-36 lg:py-56 w-full table relative bg-[url('../public/landing/bg.jpg')] bg-top bg-no-repeat bg-cover"
        id="home"
      >
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/75 to-slate-950/50"></div>
        <div className="container relative text-center text-white">
          <h3 className="font-semibold leading-normal text-5xl mb-5 mt-10">
            Empowering Learning with EMSAEC
          </h3>
          <p className="text-slate-300 text-lg max-w-xl mx-auto">
            Explore the world of knowledge with EMSAEC, your all-in-one platform
            for an enhanced educational experience with Moodle.
          </p>
          <div className="mt-8">
            <Link
              to="/contact"
              className="py-3 px-8 inline-block font-medium text-base transition-all duration-500 bg-violet-600 hover:bg-violet-700 text-white rounded-lg"
            >
              Get Started
            </Link>
          </div>
        </div>
      </section>

      <section className="relative py-24 px-32" id="about">
        <div className="container mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-5">
            <div className="relative w-full max-w-lg mx-auto">
              <img
                src="/landing/about.jpg"
                className="rounded-lg shadow-lg"
                alt="About EMSAEC"
              />
            </div>
          </div>
          <div className="lg:col-span-7">
            <div className="lg:ml-7 text-gray-800">
              <h3 className="text-3xl font-semibold mb-4">About EMSAEC</h3>
              <p className="text-slate-600 max-w-2xl">
                EMSAEC is designed to make learning accessible, interactive, and
                effective. Leveraging Moodle's capabilities, our platform
                provides resources, courses, and tools to foster an enriching
                learning experience.
              </p>
              <div className="mt-8">
                <Link
                  to="/about"
                  className="py-2 px-5 inline-block font-medium text-base transition-all duration-500 bg-violet-600 hover:bg-violet-700 text-white rounded-lg"
                >
                  Learn More
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Landing;
