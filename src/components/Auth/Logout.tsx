import axios from "axios";
import { LogOut } from "lucide-react";
import { persistor } from "@/redux/store";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const Logout = ({ navbar = false }: { navbar?: boolean }) => {
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_PUBLIC_API_KEY}/api/logout`,
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
        }
      );

      Cookies.remove("token");
      if (response.status === 200) {
        persistor.purge();
        navigate("/login");
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
      className={`flex items-center ${
        navbar ? "text-white px-5 py-3 opacity-50" : ""
      }`}
    >
      <LogOut className="w-4 mr-2" />
      Logout
    </button>
  );
};

export default Logout;
