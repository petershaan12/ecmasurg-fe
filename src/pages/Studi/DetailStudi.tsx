import MenuSamping from "@/components/MenuSamping";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Like from "@/components/Studi/Like";
import Loading from "@/components/Loading";
import axios from "axios";
import { useSelector } from "react-redux";
import { BsThreeDotsVertical } from "react-icons/bs";
import DeleteStudi from "@/components/Studi/Hapus";

type Comment = {
  user: {
    id: string;
    name: string;
    roles: string;
    photo_profile: string;
  };
  comment: string;
};

type PostData = {
  id: string;
  user: {
    id: string;
    name: string;
    roles: string;
    photo_profile: string;
  };
  description: string;
  photo_kasus: string;
  likes_count: number;
  comments_count: number;
  comments: Comment[];
};

const DetailStudi: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [postData, setPostData] = useState<PostData | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState("");
  const userPemilik = useSelector((state: any) => state.data);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [likes, setLikes] = useState(0);

  const updateLikes = (isLiked: boolean) => {
    setLikes((prevLikes) => (isLiked ? prevLikes + 1 : prevLikes - 1));
  };

  const fetchPostData = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_PUBLIC_API_KEY}/api/studikasus/show/${id}`,
        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        }
      );
      setPostData(response.data.data);
      setLikes(response.data.data.likes_count);
      setComments(response.data.data.comments);
    } catch (error) {
      console.error("Error fetching post data:", error);
    }
  };

  useEffect(() => {
    if (id) {
      setLoading(true);
      fetchPostData().then(() => setLoading(false));
    }
  }, [id]);

  const handleAddComment = async () => {
    if (newComment.trim() === "") return;

    try {
      const response = await axios.post(
        `${process.env.REACT_PUBLIC_API_KEY}/api/comment/${id}`,
        { comment: newComment },
        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        }
      );

      const commentData = response.data.data;

      // Ensure you structure the new comment correctly
      const newCommentData: Comment = {
        user: {
          id: userPemilik.id,
          name: userPemilik.name,
          roles: userPemilik.roles,
          photo_profile: userPemilik.photo_profile,
        },
        comment: commentData.comment,
      };

      // Update comments state with the new comment
      setComments((prevComments) => [...prevComments, newCommentData]);
      setNewComment(""); // Reset input komentar
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  if (loading || !postData) {
    return <Loading />;
  }

  return (
    <>
      <header className="flex justify-between items-center">
        <div className="flex space-x-5">
          <h1 className="md:text-2xl font-bold">Studi Kasus</h1>
        </div>
        <MenuSamping />
      </header>
      <main className="mt-8 ">
        <div className="relative mx-auto bg-white rounded-xl shadow-md p-4 mb-6 border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <Avatar className="mr-2">
                <AvatarImage
                  src={`${process.env.REACT_PUBLIC_API_KEY}/storage/profiles/${postData.user.photo_profile}`}
                />
                <AvatarFallback className="bg-primary/80 text-white uppercase ">
                  {postData.user.name
                    ? postData.user.name
                        .split(" ")
                        .map((name: string) => name.slice(0, 1))
                        .join("")
                    : "AB"}
                </AvatarFallback>
              </Avatar>
              <div>
                <h2 className="text-sm font-semibold text-gray-900">
                  {postData.user.name}
                </h2>
                <p className="text-xs text-gray-500">{postData.user.roles}</p>
              </div>
            </div>

            {userPemilik.id === postData.user.id && (
              <div className="relative">
                <button
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="p-2 rounded-full hover:bg-gray-200"
                >
                  <BsThreeDotsVertical className="w-5 h-5 text-gray-500" />
                </button>
                {isMenuOpen && (
                  <div className="absolute right-0 mt-2 w-32 bg-white shadow-lg rounded-lg">
                    <DeleteStudi
                      idPemilik={userPemilik.id}
                      idUser={postData.user.id}
                      idStudi={id}
                    />
                  </div>
                )}
              </div>
            )}
          </div>

          <p className="text-sm text-gray-700 mb-4">{postData.description}</p>

          <div className="rounded-lg overflow-hidden mb-4">
            {postData.photo_kasus && (
              <img
                className="w-full h-48 object-cover"
                src={`${process.env.REACT_PUBLIC_API_KEY}/storage/studi_kasus/${postData.photo_kasus}`}
                alt="Post image"
              />
            )}
          </div>

          <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
            <button className="flex items-center space-x-2">
              <Like id={postData.id} updateLikes={updateLikes} />
            </button>

            <div className="flex items-center space-x-2">
              <span>{likes} like</span>
              <span>{postData.comments_count} Komentar</span>
            </div>
          </div>

          <div className="border-t pt-4">
            <h3 className="text-lg font-semibold mb-2">
              Komentar ({comments.length})
            </h3>
            <ul>
              {comments.map((comment, index) => (
                <li key={index} className="mb-3">
                  <p className="font-semibold">{comment.user.name}</p>
                  <p className="text-sm text-gray-600">{comment.comment}</p>
                </li>
              ))}
            </ul>

            <div className="mt-6">
              <Input
                type="text"
                placeholder="Tambah komentar..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                className="mb-2"
              />
              <Button onClick={handleAddComment}>Kirim Komentar</Button>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default DetailStudi;
