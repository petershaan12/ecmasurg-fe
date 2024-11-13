import { Link } from "react-router-dom";
import { motion, useAnimation, useInView } from "framer-motion";
import { useEffect, useRef } from "react";

const About = () => {
  const ref = useRef<any>(null);
  const isInView = useInView(ref, { once: true });

  const mainControls = useAnimation();

  useEffect(() => {
    if (isInView) {
      mainControls.start("visible");
    }
  }, [isInView]);
  return (
    <section
      className="relative px-6 pb-0 pt-10 flex items-center justify-center"
      id="about"
    >
      <div className="container mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        <div className="lg:col-span-6 h-full lg:-ml-24 order-1 md:order-0">
          <div className="w-72 md:w-[450px] mx-auto lg:mx-0 lg:ml-auto lg:mr-0 ">
            <motion.img
              variants={{
                hidden: { opacity: 0, x: 75 },
                visible: { opacity: 1, x: 0 },
              }}
              initial="hidden"
              animate={mainControls}
              transition={{ duration: 0.5, delay: 0.2 }}
              src="/learn-teacher.png"
              alt="About EMSAEC"
            />
          </div>
        </div>
        <div className="lg:col-span-6 md:order-1">
          <div ref={ref} className="lg:ml-7 text-black">
            <motion.h3
              variants={{
                hidden: { opacity: 0, x: -75 },
                visible: { opacity: 1, x: 0 },
              }}
              initial="hidden"
              animate={mainControls}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-lg text-center md:text-left md:text-3xl font-bold mb-4 text-primary"
            >
              Tentang E-msaec
            </motion.h3>
            <motion.p
              variants={{
                hidden: { opacity: 0, x: -75 },
                visible: { opacity: 1, x: 0 },
              }}
              initial="hidden"
              animate={mainControls}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="text-black  text-center md:text-left  text-sm md:text-sm max-w-lg"
            >
              E-msaec adalah platform pembelajaran interaktif yang dirancang
              khusus untuk mendukung mahasiswa dan profesional kesehatan dalam
              memahami konsep mendalam tentang sistem muskulosektual dan
              disiplin terkait ilmu bedah.
            </motion.p>
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 40 },
                visible: { opacity: 1, y: 0 },
              }}
              initial="hidden"
              animate={mainControls}
              transition={{ duration: 1, delay: 0.2 }}
              className="mt-8 flex md:justify-start justify-center"
            >
              <Link
                to="mailto:evelynetambunan@gmail.com"
                className="py-2 px-5 inline-block font-medium text-base transition-all duration-500 bg-primary text-white rounded-lg"
              >
                Contact Us
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
