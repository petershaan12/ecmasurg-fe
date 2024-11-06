import { useState } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useSelector } from "react-redux";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import { DialogTitle } from "@radix-ui/react-dialog";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { useTypewriter } from "react-simple-typewriter";

const Posting = () => {
  const user = useSelector((state: any) => state.data);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(e.target.value);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const fileType = file.type;
      const validTypes = ["image/png", "image/jpeg", "image/jpg"];
      if (validTypes.includes(fileType)) {
        setSelectedImage(file);
      } else {
        toast.error("File harus berupa gambar dengan format PNG atau JPG.");
      }
    }
  };
  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      const formData = new FormData();
      formData.append("description", inputValue);
      if (selectedImage) {
        formData.append("photo_kasus", selectedImage);
      }
      formData.append("user_id", user.id);

      await axios.post(
        `${process.env.REACT_PUBLIC_API_KEY}/api/studikasus/create`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        }
      );
      toast.success("Forum Diskusi berhasil diposting.");
      window.location.reload();
    } catch (error) {
      console.error("Submission failed", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const [text] = useTypewriter({
    words: [
      "Posting Forum Diskusi Disini",
      "Apa sih Masalah Stress Pada Otak ?",
      "Terobosan Baru dalam pengobatan penyakit langka",
    ],
    loop: true,
    onLoopDone: () => console.log(`Loop completed after 3 runs.`),
  });

  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="relative"
          >
            <Input
              className="bg-white border-2 border-black rounded-lg h-12 pr-10"
              placeholder={text}
            />
            <span className="absolute inset-y-0 right-0 flex items-center pr-3">
              <img src="/icons/send.svg" alt="paper-plane" />
            </span>
          </motion.div>
        </DialogTrigger>

        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader className="flex flex-col items-center gap-4">
            <DialogTitle>Posting Forum Diskusi</DialogTitle>
            <div className="flex w-full items-center gap-x-3">
              <Avatar>
                <AvatarImage
                  src={`${process.env.REACT_PUBLIC_API_KEY}/storage/profiles/${user.photo_profile}`}
                />
                <AvatarFallback className="bg-primary/80 text-white uppercase">
                  {user.name
                    ? user.name
                        .split(" ")
                        .map((name: string) => name.slice(0, 1))
                        .join("")
                    : "AB"}
                </AvatarFallback>
              </Avatar>
              <div>
                <h3 className="text-md font-semibold">{user.name}</h3>
                <p className="text-sm text-gray-500">{user.roles}</p>
              </div>
            </div>
          </DialogHeader>

          {/* Input Teks */}
          <Textarea
            placeholder="Apa yang ingin anda Bicarakan"
            value={inputValue}
            onChange={handleInputChange}
            className="h-36 border-none shadow-none  "
          />

          {/* Input Gambar */}
          <div className="mt-4">
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
          </div>

          {/* Preview gambar jika ada */}
          {selectedImage && (
            <div className="mt-4">
              <img
                src={URL.createObjectURL(selectedImage)}
                alt="Selected Image"
                width={100}
                height={100}
                className="object-cover rounded-lg"
              />
            </div>
          )}

          <DialogFooter className="mt-6">
            <Button onClick={handleSubmit} disabled={isSubmitting}>
              {isSubmitting ? "Posting..." : "Posting"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Posting;
