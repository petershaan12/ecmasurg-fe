import { useEffect, useState } from "react";
import Post from "@/components/Studi/Post";
import MenuSamping from "../../components/MenuSamping";
import Posting from "./Posting";
import axios from "axios";
import Loading from "@/components/Loading";
import { toast } from "sonner";
import { motion } from "framer-motion";

const Studi = () => {
  interface PostType {
    id: number;
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
  }

  const [posts, setPosts] = useState<PostType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_PUBLIC_API_KEY}/api/studikasus`,
          {
            headers: {
              Accept: "application/json",
              Authorization: `Bearer ${sessionStorage.getItem("token")}`,
            },
          }
        );
        setPosts(response.data.data.data);
      } catch (err) {
        toast.error("Gagal memuat postingan.");
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) return <Loading />;

  if (!posts) {
    return <h1>Belum ada postingan</h1>;
  }

  return (
    <>
      <header className="flex justify-between items-center">
        <div className="flex space-x-5">
          <h1 className="md:text-xl font-bold">Forum Diskusi</h1>
        </div>
        <MenuSamping />
      </header>

      <main className="mt-8 grid grid-cols-1 md:grid-cols-4 md:space-x-5">
        <div className="md:col-span-3">
          <Posting />

          {posts.map((post) => (
            <div className="mt-8" key={post.id}>
              <Post
                id={post.id}
                user={post.user}
                description={post.description}
                photo_kasus={post.photo_kasus}
                likes={post.likes_count}
                comments={post.comments_count}
              />
            </div>
          ))}
        </div>
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="md:col-span-1 bg-primary rounded-2xl px-4 py-5 text-white mt-10 md:mt-0 h-fit" // Kolom 1/4
          id="trending"
        >
          <h1 className="text-lg font-semibold">Trending</h1>
          <ul className="text-sm space-y-2 mt-4">
            <li className="flex items-center">
              <span className="mr-2">&gt;</span>
              <a href="#" className="hover:text-blue-500 hover:underline">
                Terobosan Baru dalam Pengobatan Penyakit Langka
              </a>
            </li>
            <li className="flex items-center">
              <span className="mr-2">&gt;</span>
              <a href="#" className="hover:text-blue-500 hover:underline">
                Kaitan Antara Gaya Hidup Sedentary dan Risiko Penyakit Kronis
              </a>
            </li>
            <li className="flex items-center">
              <span className="mr-2">&gt;</span>
              <a href="#" className="hover:text-blue-500 hover:underline">
                Munculnya Varian Baru Virus
              </a>
            </li>
            <li className="flex items-center">
              <span className="mr-2">&gt;</span>
              <a href="#" className="hover:text-blue-500 hover:underline">
                Pentingnya Vaksinasi untuk Anak-anak
              </a>
            </li>
            <li className="flex items-center">
              <span className="mr-2">&gt;</span>
              <a href="#" className="hover:text-blue-500 hover:underline">
                Dampak Pandemi COVID-19 terhadap Kesehatan Mental
              </a>
            </li>
          </ul>
        </motion.div>
      </main>
    </>
  );
};

export default Studi;
