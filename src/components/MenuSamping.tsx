// import { IoMdNotificationsOutline } from "react-icons/io";
import { IoSettingsOutline } from "react-icons/io5";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu";
import { Link } from "react-router-dom";
import MobileMenu from "./MobileMenu";
import Logout from "./Auth/Logout";
import { useSelector } from "react-redux";
import { CgProfile } from "react-icons/cg";

const MenuSamping = () => {
  const user = useSelector((state: any) => state.data);
  if (!user) return null;

  return (
    <div className="flex space-x-5 items-center">
      <Link to="/home/profile/edit" className="hover:cursor-pointer">
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
            <Link to="/home/profile" className="flex items-center w-full">
              <CgProfile className="w-4 mr-2" />
              Profile
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem className="hover:cursor-pointer ">
            <p className="w-full">
              <Logout />
            </p>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <MobileMenu />
    </div>
  );
};

export default MenuSamping;
