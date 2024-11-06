import React, { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Link } from "react-router-dom";
import Like from "./Like";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useSelector } from "react-redux";
import DeleteStudi from "./Hapus";

type PostProps = {
  id: number;
  user: {
    id: string;
    name: string;
    roles: string;
    photo_profile: string;
  };
  description: string;
  photo_kasus: string;
  likes: number;
  comments: number;
};

const Post: React.FC<PostProps> = ({
  id,
  description,
  photo_kasus,
  user: { id: userId, name, roles, photo_profile },
  likes: initialLikes,
  comments,
}) => {
  const userPemilik = useSelector((state: any) => state.data);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [likes, setLikes] = useState(initialLikes);

  const updateLikes = (isLiked: boolean) => {
    setLikes((prevLikes) => (isLiked ? prevLikes + 1 : prevLikes - 1));
  };

  return (
    <div className="relative mx-auto bg-white rounded-xl shadow-md p-4 mb-6 border border-gray-200">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <Avatar className="mr-2">
            <AvatarImage
              src={`${process.env.REACT_PUBLIC_API_KEY}/storage/profiles/${photo_profile}`}
            />
            <AvatarFallback className="bg-primary/80 text-white uppercase ">
              {name
                ? name
                    .split(" ")
                    .map((name: string) => name.slice(0, 1))
                    .join("")
                : "AB"}
            </AvatarFallback>
          </Avatar>

          <div>
            <h2 className="text-sm font-semibold text-gray-900">{name}</h2>
            <p className="text-xs text-gray-500">{roles}</p>
          </div>
        </div>

        <div className="relative">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2 rounded-full hover:bg-gray-200"
          >
            <BsThreeDotsVertical className="w-5 h-5 text-gray-500" />
          </button>

          {isMenuOpen && (
            <div className="absolute right-0 mt-2 w-32 bg-white shadow-lg rounded-lg">
              {userPemilik.id === userId && (
                <DeleteStudi
                  idPemilik={userPemilik.id}
                  idUser={userId}
                  idStudi={id}
                />
              )}
              <Link
                to={`/forum-diskusi/${id}`}
                className="hover:bg-primary/50 hover:text-white w-full block px-4 py-2 text-sm"
              >
                View Detail
              </Link>
            </div>
          )}
        </div>
      </div>

      <p className="text-sm text-gray-700 mb-4">{description}</p>
      <div className="rounded-lg overflow-hidden mb-4">
        {photo_kasus && (
          <img
            className="w-full h-48 object-contain"
            src={`${process.env.REACT_PUBLIC_API_KEY}/storage/studi_kasus/${photo_kasus}`}
            alt="Post image"
          />
        )}
      </div>
      <div className="flex items-center justify-between text-sm text-gray-500">
        <div className="flex items-center space-x-2">
          <Like id={id} updateLikes={updateLikes} />
          <Link to={`/forum-diskusi/${id}`}>Comment</Link>
        </div>

        <div className="flex items-center space-x-2">
          <span>{likes} like</span>
          <Link to={`/forum-diskusi/${id}`}>
            <span>{comments} Komentar</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Post;
