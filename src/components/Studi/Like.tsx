import { useState } from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";

const Like = () => {
  const [liked, setLiked] = useState(false);

  const toggleLike = () => {
    setLiked(!liked);
  };

  return (
    <button className="flex items-center space-x-2" onClick={toggleLike}>
      {liked ? <AiFillHeart className="text-red-500" /> : <AiOutlineHeart />}
      <span>{liked ? "Unlike" : "Like"}</span>
    </button>
  );
};

export default Like;
