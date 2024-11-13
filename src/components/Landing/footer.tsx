import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function Footer() {
  return (
    <>
      <footer className="footer bg-slate-900 relative text-gray-200  px-5 md:px-32 ">
        <div className="text-center py-6 pt-12">
          <motion.img
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            src="/navbar/logo.svg"
            className="block mx-auto w-32 md:w-56"
            alt=""
          />
          <p className="max-w-xl mx-auto text-white/60 mt-4 text-sm">
            Platform Pembelajaran Interaktif untuk Generasi Berpikir Kritis
          </p>
        </div>

        <div className="py-[30px] px-0 border-t border-white/20">
          <div className="container text-center">
            <div className="flex justify-center items-center">
              <p className="text-white md:text-sm text-xs">
                ©{new Date().getFullYear()} E-msaec.
                <i className="mdi mdi-heart text-red-700"></i> by{" "}
                <Link
                  to="https://shreethemes.in/"
                  target="_blank"
                  className="text-reset"
                >
                  Evelyne Tambunan
                </Link>
              </p>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
