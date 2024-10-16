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
// import Logout from "./Logout";
import { Link } from "react-router-dom";
import MobileMenu from "./MobileMenu";

const MenuSamping = () => {
  return (
    <div className="flex space-x-5 items-center">
      <IoMdNotificationsOutline className="w-6 h-8" />
      <Link to="/profile/edit" className="hover:cursor-pointer">
        <IoSettingsOutline className="w-6 h-8" />
      </Link>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem className="hover:cursor-pointer ">
            <Link to="/profil" className="flex items-center">
              <Settings className="w-4 mr-2" />
              Profile
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem className="hover:cursor-pointer ">
            {/* <Logout /> */}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <MobileMenu />
    </div>
  );
};

export default MenuSamping;
