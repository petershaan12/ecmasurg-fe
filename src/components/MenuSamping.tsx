import { IoMdNotificationsOutline } from "react-icons/io";
import { IoSettingsOutline } from "react-icons/io5";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu";
import { Settings } from "lucide-react";
import { Link } from "react-router-dom";
import MobileMenu from "./MobileMenu";
import Logout from "./Auth/Logout";
import { useSelector } from "react-redux";

const MenuSamping = () => {
  const user = useSelector((state: any) => state.data);
  if (!user) return null;

  return (
    <div className="flex space-x-5 items-center">
      <IoMdNotificationsOutline className="w-6 h-8" />
      <Link to="/profile/edit" className="hover:cursor-pointer">
        <IoSettingsOutline className="w-6 h-8" />
      </Link>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Avatar>
            <AvatarImage
              src={`${process.env.REACT_PUBLIC_API_KEY}/storage/profiles/${user.photo_profile}`}
            />
            <AvatarFallback className="bg-primary/80 text-white uppercase">
              {user.name
                ? user.name
                    .split(" ")
                    .map((name: string) => name.slice(0, 1))
                    .join("")
                : "AB"}
            </AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem className="hover:cursor-pointer ">
            <Link to="/profile" className="flex items-center">
              <Settings className="w-4 mr-2" />
              Profile
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem className="hover:cursor-pointer ">
            <Logout />
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <MobileMenu />
    </div>
  );
};

export default MenuSamping;
