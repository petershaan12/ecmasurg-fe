import { useState, useEffect } from "react";
import axios from "axios";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { toast } from "sonner";
import Cookies from "js-cookie";

const Like = ({ id, updateLikes }: any) => {
  const [liked, setLiked] = useState(false);

  // Fetch current like status when component mounts
  useEffect(() => {
    const fetchLikeStatus = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_PUBLIC_API_KEY}/api/like/${id}`,
          {
            headers: {
              Accept: "application/json",
              Authorization: `Bearer ${Cookies.get("token")}`,
            },
          }
        );
        const isLiked = response.data.data ? true : false;
        setLiked(isLiked);
      } catch (error) {
        toast.error("Gagal fetch like status.");
        console.error("Error fetching like status:", error);
      }
    };

    fetchLikeStatus();
  }, [id]);

  const toggleLike = async () => {
    try {
      // Send POST request to toggle like/unlike
      const response = await axios.post(
        `${process.env.REACT_PUBLIC_API_KEY}/api/like/${id}`,
        {}, // No data to send
        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
        }
      );

      if (response.status === 200 || response.status === 201) {
        setLiked(!liked);
        updateLikes(!liked);
      }
    } catch (error) {
      toast.error("Gagal menyukai postingan.");
      console.error("Error toggling like:", error);
    }
  };

  return (
    <button className="flex items-center space-x-2" onClick={toggleLike}>
      {liked ? <AiFillHeart className="text-red-500" /> : <AiOutlineHeart />}
      <span>{liked ? "Unlike" : "Like"}</span>
    </button>
  );
};

export default Like;
