import axios from "axios";
import { persistor } from "@/redux/store";
import { CgLogOut } from "react-icons/cg";
import { motion } from "framer-motion";

const LogoutNavbar = ({ open }: any) => {
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

  return (
    <button
      onClick={handleLogout}
      className={`relative flex h-10 w-full text-white opacity-40 items-center rounded-md transition-colors 
           hover:bg-[linear-gradient(90deg,#1C4185,#002979)] hover:font-bold hover:opacity-100
          `}
    >
      <motion.div
        layout
        className="grid h-full w-10 place-content-center text-lg"
      >
        <CgLogOut />
      </motion.div>
      {open && (
        <motion.span
          layout
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.125 }}
          className="text-sm font-medium"
        >
          Logout
        </motion.span>
      )}
    </button>
  );
};

export default LogoutNavbar;
