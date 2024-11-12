import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <>
      <footer className="footer bg-primary relative text-gray-200 dark:text-gray-200 px-5 md:px-32">
        <div className="text-center py-6 pt-12">
          <img
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
                ©{new Date().getFullYear()} EMSAEC.
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
