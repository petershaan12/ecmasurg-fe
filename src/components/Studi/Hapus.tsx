import axios from "axios";
import { toast } from "sonner";

const DeleteStudi = ({ idPemilik, idUser, idStudi }: any) => {
  const handleDelete = async () => {
    if (idPemilik !== idUser) {
      toast.error("You do not have permission to delete this post");
      return;
    }
    try {
      await axios.delete(
        `${process.env.REACT_PUBLIC_API_KEY}/api/studikasus/delete/${idStudi}`,
        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        }
      );
      toast.success("Post deleted successfully");
      window.location.reload();
    } catch (error) {
      console.error("Failed to delete the post:", error);
      toast.error("Failed to delete the post");
    }
  };

  return (
    <button
      onClick={handleDelete}
      className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
    >
      Hapus
    </button>
  );
};

export default DeleteStudi;
