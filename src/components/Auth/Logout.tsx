import axios from "axios";
import { LogOut } from "lucide-react";
import { persistor } from "@/redux/store";

const Logout = ({ navbar = false }: { navbar?: boolean }) => {
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
      className={`flex ${navbar ? "text-white px-5 py-3 opacity-50" : ""}`}
    >
      <LogOut className="w-4 mr-2" />
      Logout
    </button>
  );
};

export default Logout;
