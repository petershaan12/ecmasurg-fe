import { useState } from "react";
import { CgGames, CgProfile } from "react-icons/cg";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { FiChevronsRight } from "react-icons/fi";
import LogoutNavbar from "./Auth/LogoutNavbar";

const Sidebar = () => {
  const [open, setOpen] = useState(true);
  const [selected, setSelected] = useState("Beranda");
  const location = useLocation();
  const pathname = location.pathname;

  return (
    <motion.nav
      layout
      className="hidden md:block sticky top-0 h-screen shrink-0 border-r border-slate-300 bg-[#002979] p-2"
      style={{
        width: open ? "250px" : "fit-content",
      }}
    >
      <TitleSection open={open} />

      <div className="space-y-7 mt-10">
        <Option
          title="Beranda"
          selected={selected}
          setSelected={setSelected}
          open={open}
          to="/"
          iconSrc="/navbar/beranda.svg"
          pathname={pathname}
          icon=""
        />
        <Option
          title="Modul"
          selected={selected}
          setSelected={setSelected}
          open={open}
          to="/modul"
          iconSrc="/navbar/modul.svg"
          pathname={pathname}
          icon=""
        />
        <Option
          title="Forum Diskusi"
          selected={selected}
          setSelected={setSelected}
          open={open}
          to="/forum-diskusi"
          iconSrc="/navbar/kasus.svg"
          pathname={pathname}
          icon=""
        />
        <Option
          title="Game"
          selected={selected}
          setSelected={setSelected}
          open={open}
          to="/games"
          iconSrc=""
          pathname={pathname}
          icon={<CgGames />}
        />

        <Option
          title="Profile"
          selected={selected}
          setSelected={setSelected}
          open={open}
          to="/profile"
          iconSrc="/navbar/profil.svg"
          pathname={pathname}
          icon={<CgProfile />}
        />
        <LogoutNavbar open={open} />
      </div>

      <ToggleClose open={open} setOpen={setOpen} />
    </motion.nav>
  );
};

const Option = ({
  title,
  setSelected,
  open,
  to,
  iconSrc,
  pathname,
  icon,
}: any) => {
  return (
    <Link
      to={to}
      className={`relative flex h-10 w-full items-center rounded-md transition-colors hover:bg-[linear-gradient(90deg,#1C4185,#002979)] hover:font-bold hover:opacity-100 ${
        pathname === to
          ? `${
              open ? "bg-[linear-gradient(90deg,#1C4185,#002979)]" : ""
            } font-bold text-white`
          : "text-white opacity-40"
      }`}
      onClick={() => setSelected(title)}
    >
      <motion.div
        layout
        className="grid h-full w-10 place-content-center text-lg"
      >
        {icon ? icon : <img src={iconSrc} alt={title} width={20} height={20} />}
      </motion.div>
      {open && (
        <motion.span
          layout
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.125 }}
          className="text-sm font-medium"
        >
          {title}
        </motion.span>
      )}
    </Link>
  );
};

const TitleSection = ({ open }: any) => {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ type: "spring", stiffness: 100 }}
      className="flex justify-center items-center mb-16 mt-10"
    >
      {open ? (
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
      ) : (
        <motion.img
          layout
          key="logo_only"
          src="/navbar/logo_only.svg"
          alt="EduMedSurg"
          width={30}
          height={30}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 100 }}
        />
      )}
    </motion.div>
  );
};

const ToggleClose = ({ open, setOpen }: any) => {
  return (
    <motion.button
      layout
      onClick={() => setOpen((pv: any) => !pv)}
      className="absolute bottom-0 left-0 right-0 transition-colors  text-white"
    >
      <div className="flex items-center p-2">
        <motion.div
          layout
          className="grid size-10 place-content-center text-lg"
        >
          <FiChevronsRight
            className={`transition-transform ${open && "rotate-180"}`}
          />
        </motion.div>
        {open && (
          <motion.span
            layout
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.125 }}
            className="text-xs font-medium "
          >
            Hide
          </motion.span>
        )}
      </div>
    </motion.button>
  );
};

export default Sidebar;
