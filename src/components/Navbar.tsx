import { CgProfile } from "react-icons/cg";
import { Link, useLocation } from "react-router-dom";
import Logout from "./Auth/Logout";

const Navbar = () => {
  const location = useLocation();
  const pathname = location.pathname;

  return (
    <aside className="w-64 h-screen hidden md:block">
      <nav className="bg-[#002979] h-screen w-72 text-white flex flex-col rounded-tr-3xl rounded-br-3xl ">
        <div className="mb-8">
          {/* Logo */}
          <div className="flex justify-center items-center w-100 mb-16 mt-10 ">
            <img
              src="/navbar/logo.svg"
              alt="EduMedSurg"
              width={150}
              height={40}
            />
          </div>
          {/* Main Links */}
          <ul className="space-y-4">
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
                  pathname.startsWith("/modul")
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
                to="/studi-kasus"
                className={`flex items-center space-x-3 px-5 py-3 text-white ${
                  pathname.startsWith("/studi-kasus")
                    ? "font-bold bg-[linear-gradient(90deg,#1C4185,#002979)] opacity-100"
                    : "opacity-40"
                }`}
              >
                <img
                  src="/navbar/kasus.svg"
                  alt="Studi Kasus"
                  width={20}
                  height={20}
                />
                <span>Studi Kasus</span>
              </Link>
            </li>
          </ul>
        </div>

        {/* More Section */}
        <div className="mt-10">
          <h3 className="text-sm text-gray-400 uppercase tracking-wide mb-4 px-5">
            More
          </h3>
          <ul className="space-y-4">
            <li>
              <Link
                to="/profile"
                className={`flex items-center space-x-3 px-5 py-3 text-white ${
                  pathname.startsWith("/profil")
                    ? "font-bold bg-[linear-gradient(90deg,#1C4185,#002979)] opacity-100"
                    : "opacity-40"
                }`}
              >
                <CgProfile />
                <span>Profile</span>
              </Link>
            </li>
            <li>
              <Logout navbar={true} />
            </li>
          </ul>
        </div>
      </nav>
    </aside>
  );
};

export default Navbar;
