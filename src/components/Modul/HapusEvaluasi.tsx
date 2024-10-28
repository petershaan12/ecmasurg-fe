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

interface HapusEvaluasiProps {
  id: string;
}

const HapusEvaluasi = ({ id }: HapusEvaluasiProps) => {
  const { id: idModul } = useParams<{ id: string }>();
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    const toastId = toast.loading("Hapus Evaluasi...");
    try {
      setIsDeleting(true);
      const response = await axios.delete(
        `${process.env.REACT_PUBLIC_API_KEY}/api/modul/evaluasi/${idModul}/delete/${id}`,
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        }
      );
      if (response.status === 200) {
        toast.success("Evaluasi berhasil dihapus!", {
          id: toastId,
        });
        window.location.reload();
      } else {
        toast.error("Terjadi kesalahan saat menghapus evaluasi.", {
          id: toastId,
        });
      }
    } catch (error) {
      toast.error("Gagal menghapus evaluasi. Coba lagi.", {
        id: toastId,
      });
      console.error("Error deleting evalasi:", error);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <p className="text-red-500 hover:underline cursor-pointer">
          <span>Delete</span>
        </p>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Are you sure want to delete this Evaluasi?{" "}
          </AlertDialogTitle>
          <AlertDialogDescription>
            This Action cannot be undone
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            className="bg-red-500 hover:bg-red-800 text-white px-3 py-2 space-x-2 text-center rounded-xl flex justify-center items-center text-sm"
            disabled={isDeleting}
            onClick={handleDelete}
          >
            {isDeleting ? "Deleting..." : "Delete"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default HapusEvaluasi;
