import axios from "axios";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "sonner"; // Menggunakan toast dari Sonner untuk notifikasi
import {
  AlertDialog,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTrigger,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogTitle,
} from "../ui/alert-dialog";
import { AlertDialogCancel } from "@radix-ui/react-alert-dialog";

interface HapusAssignment {
  id: string;
  idsubmodul: string;
}

const HapusAssignment = ({ id, idsubmodul }: HapusAssignment) => {
  const { id: idModul } = useParams<{ id: string }>();
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    const toastId = toast.loading("Hapus Modul...");
    try {
      setIsDeleting(true);
      const response = await axios.delete(
        `${process.env.REACT_PUBLIC_API_KEY}/api/modul/${idModul}/task/${idsubmodul}/delete/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.status === 200) {
        toast.success("Modul berhasil dihapus!", {
          id: toastId,
        });
        window.location.reload();
      } else {
        toast.error("Terjadi kesalahan saat menghapus modul.", {
          id: toastId,
        });
      }
    } catch (error) {
      toast.error("Gagal menghapus modul. Coba lagi.", {
        id: toastId,
      });
      console.error("Error deleting modul:", error);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <p className="text-red-500 hover:underline  cursor-pointer">
          <span>Remove</span>
        </p>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Are you sure want to delete this task?{" "}
          </AlertDialogTitle>
          <AlertDialogDescription>
            This Action cannot be undone
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Batal</AlertDialogCancel>
          <AlertDialogAction
            className="bg-red-500 hover:bg-red-800 text-white px-3 py-2 space-x-2 text-center rounded-xl flex justify-center items-center text-sm"
            disabled={isDeleting}
            onClick={handleDelete}
          >
            {isDeleting ? "Menghapus..." : "Hapus"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default HapusAssignment;
