import axios from "axios";
import { useState } from "react";
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
import { Button } from "../ui/button";

interface HapusEvaluasiStudent {
  id: string;
  idevaluasi: any;
}

const HapusEvaluasiStudent = ({ id, idevaluasi }: HapusEvaluasiStudent) => {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    const toastId = toast.loading("Hapus evaluasi...");
    try {
      setIsDeleting(true);
      const response = await axios.delete(
        `${process.env.REACT_PUBLIC_API_KEY}/api/answerevaluasi/${idevaluasi}/delete/${id}`,
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        }
      );
      if (response.status === 200) {
        toast.success("evaluasi berhasil dihapus!", {
          id: toastId,
        });
        window.location.reload();
      } else {
        toast.error("Terjadi kesalahan saat menghapus evaluasi Kamu.", {
          id: toastId,
        });
      }
    } catch (error) {
      toast.error("Gagal menghapus evaluasi Kamu. Coba lagi.", {
        id: toastId,
      });
      console.error("Error deleting evaluasi Kamu:", error);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button className="bg-red-500 w-full mt-2 hover:bg-red-800">
          <span>Delete</span>
        </Button>
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

export default HapusEvaluasiStudent;
