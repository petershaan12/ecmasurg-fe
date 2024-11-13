import { Link } from "react-router-dom";
import { Hexagon } from "react-feather";
import { Brain, Gamepad } from "lucide-react";
import { FaBook } from "react-icons/fa";
import { motion, useAnimation, useInView } from "framer-motion";
import { useEffect, useRef } from "react";
export default function OurServices() {
  const ref = useRef<any>(null);
  const isInView = useInView(ref, { once: true });

  const mainControls = useAnimation();

  useEffect(() => {
    if (isInView) {
      mainControls.start("visible");
    }
  }, [isInView]);

  const services = [
    {
      icon: <FaBook className="w-8 h-8" />,
      title: "Interactive Learning Modules",
      description:
        "Menyediakan modul pembelajaran berbasis website yang interaktif dan mendalam untuk membantu mahasiswa keperawatan meningkatkan pemahaman kritis dan analitis mereka.",
    },
    {
      icon: <Gamepad className="w-8 h-8" />,
      title: "Gamified Case Studies",
      description:
        "Studi kasus dalam format game yang interaktif, dirancang untuk membantu mahasiswa mengevaluasi dan menganalisis skenario klinis dalam situasi nyata.",
    },
    {
      icon: <Brain className="w-8 h-8" />,
      title: "Creative Thinking Challenges",
      description:
        "Tantangan kreatif yang bertujuan meningkatkan keterampilan berpikir tinggi melalui pemecahan masalah yang kompleks dan inovatif.",
    },
  ];

  return (
    <section
      className="relative md:py-24 py-16 px-5 md:px-32 bg-slate-900"
      id="pelayanan"
    >
      <div className="container lg mx-auto">
        <div ref={ref} className="grid grid-cols-1 pb-8 text-center">
          <motion.h3
            variants={{
              hidden: { opacity: 0, y: -25 },
              visible: { opacity: 1, y: 0 },
            }}
            initial="hidden"
            animate={mainControls}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-4 text-lg md:text-3xl font-bold  text-white"
          >
            Pelayanan Kami di E-msaec
          </motion.h3>
          <motion.p
            variants={{
              hidden: { opacity: 0, y: -25 },
              visible: { opacity: 1, y: 0 },
            }}
            initial="hidden"
            animate={mainControls}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-slate-200 max-w-xl mx-auto text-sm"
          >
            EMSAEC menghadirkan solusi pembelajaran yang inovatif dan interaktif
            untuk meningkatkan keterampilan berpikir tinggi mahasiswa melalui
            media yang dinamis.
          </motion.p>
        </div>

        <div
          ref={ref}
          className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 mt-4  gap-[30px] px-5"
        >
          {services.map((service, index) => (
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 75 },
                visible: { opacity: 1, y: 0 },
              }}
              initial="hidden"
              animate={mainControls}
              transition={{ duration: 0.5, delay: index * 0.25 }}
            >
              <div
                key={index}
                className="group relative lg:px-6 py-6 mt-4 transition duration-500 ease-in-out rounded-xl overflow-hidden text-center bg-white shadow-lg hover:shadow-xl"
              >
                <div className="relative overflow-hidden text-transparent -m-3">
                  <Hexagon className="h-28 w-28 fill-primary/5 mx-auto rotate-[30deg]"></Hexagon>
                  <div className="absolute top-2/4 -translate-y-2/4 start-0 end-0 mx-auto text-primary rounded-xl transition duration-500 ease-in-out flex align-middle justify-center items-center  h-20 w-20">
                    {service.icon}
                  </div>
                </div>
                <div className="mt-6">
                  <Link
                    to="/services"
                    className="text-lg font-semibold h5 transition duration-500 ease-in-out text-primary"
                  >
                    {service.title}
                  </Link>
                  <p className="text-black text-sm transition duration-500 ease-in-out mt-3 px-5">
                    {service.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
