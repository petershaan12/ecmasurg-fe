import axios from "axios";
import { LogOut } from "lucide-react";
import Cookies from "js-cookie";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { persistor } from "@/redux/store";

const Logout = () => {
  const [isLoggedOut, setIsLoggedOut] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;
      const response = await axios.get(`${apiUrl}/api/logout`, {
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      });

      if (response.status === 200) {
        localStorage.removeItem("token");
        persistor.purge();
        setIsLoggedOut(true); // Set status logout
      } else {
        console.error("Logout failed");
      }
    } catch (error) {
      console.error("An error occurred during logout", error);
    }
  };

  if (isLoggedOut) {
    navigate("/login");
  }

  return (
    <button onClick={handleLogout} className="flex">
      <LogOut className="w-4 mr-2" />
      Logout
    </button>
  );
};

export default Logout;
