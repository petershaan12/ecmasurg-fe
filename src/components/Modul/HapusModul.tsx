import { Button } from "../ui/button";
import { FaRegTrashAlt } from "react-icons/fa";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
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
import Cookies from "js-cookie";

interface HapusModulProps {
  id: string;
}

const HapusModul = ({ id }: HapusModulProps) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const navigate = useNavigate();

  const handleDelete = async () => {
    const toastId = toast.loading("Hapus Modul...");
    try {
      setIsDeleting(true);
      const response = await axios.delete(
        `${process.env.REACT_PUBLIC_API_KEY}/api/modul/delete/${id}`,
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
        }
      );
      if (response.status === 200) {
        toast.success("Modul berhasil dihapus!", {
          id: toastId,
        });
        navigate("/home/modul"); // Navigasi ke halaman modul setelah berhasil dihapus
      } else {
        toast.error("An error occurred while deleting the module.", {
          id: toastId,
        });
      }
    } catch (error) {
      toast.error("Failed to delete this modul. Try Again.", {
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
        <Button className="w-full bg-red-500 hover:bg-red-800 text-white px-3 py-2 space-x-2 text-center rounded flex justify-center items-center text-sm">
          <FaRegTrashAlt />
          <span>Hapus Modul</span>
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Are you sure want to delete this Modul?{" "}
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

export default HapusModul;
