import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";

const MobileMenu = () => {
  const location = useLocation();
  const pathname = location.pathname;
  return (
    <nav className="md:hidden">
      <Sheet>
        <SheetTrigger className="align-middle border border-white/10 rounded-lg">
          <Menu />
        </SheetTrigger>
        <SheetContent className="flex flex-col bg-[#002979] md:hidden border-l-primary/50 p-0 w-full  ">
          <div className="flex justify-center items-center w-100 mb-10 mt-10 p-4">
            <img
              src="/navbar/logo.svg"
              alt="EduMedSurg"
              width={150}
              height={40}
            />
          </div>
          <ul className="space-y-6">
            <li>
              <Link
                to="/"
                className={`flex items-center space-x-3 px-5 py-3 text-white ${
                  pathname === "/"
                    ? "font-bold bg-[linear-gradient(90deg,#1C4185,#002979)]"
                    : "opacity-40 font-medium"
                }`}
              >
                <img
                  src="/navbar/beranda.svg"
                  alt="Beranda"
                  width={20}
                  height={20}
                />
                <span>Beranda</span>
              </Link>
            </li>
            <li>
              <Link
                to="/modul"
                className={`flex items-center space-x-3 px-5 py-3 text-white ${
                  pathname === "/modul"
                    ? "font-bold bg-[linear-gradient(90deg,#1C4185,#002979)] opacity-100"
                    : "opacity-40"
                }`}
              >
                <img
                  src="/navbar/modul.svg"
                  alt="Modul"
                  width={20}
                  height={20}
                />
                <span>Modul</span>
              </Link>
            </li>
            <li>
              <Link
                to="/kasus-studi"
                className={`flex items-center space-x-3 px-5 py-3 text-white ${
                  pathname === "/kasus-studi"
                    ? "font-bold bg-[linear-gradient(90deg,#1C4185,#002979)] opacity-100"
                    : "opacity-40"
                }`}
              >
                <img
                  src="/navbar/kasus.svg"
                  alt="Kasus Studi"
                  width={20}
                  height={20}
                />
                <span>Kasus Studi</span>
              </Link>
            </li>
            <li>
              <Link
                to="/studi"
                className={`flex items-center space-x-3 px-5 py-3 text-white ${
                  pathname === "/studi"
                    ? "font-bold bg-[linear-gradient(90deg,#1C4185,#002979)] opacity-100"
                    : "opacity-40"
                }`}
              >
                <img
                  src="/navbar/studi.svg"
                  alt="Studi Kasus"
                  width={20}
                  height={20}
                />
                <span>Studi Kasus</span>
              </Link>
            </li>
          </ul>
        </SheetContent>
      </Sheet>
    </nav>
  );
};

export default MobileMenu;