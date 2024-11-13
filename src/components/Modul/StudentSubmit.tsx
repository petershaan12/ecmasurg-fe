import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

type Assignment = {
  length: number;
  id: string;
  idsubmodul: string;
  judul: string;
  description: string;
  link_video: string;
  submited: boolean;
  files: string[];
  map: (arg0: (file: any, index: number) => JSX.Element) => JSX.Element[];
};

type StudentProps = {
  id: string | undefined;
  idsubmodul: string | undefined;
  userid: string | "";
};

const StudentSubmit = ({ id, idsubmodul, userid }: StudentProps) => {
  const [tugasSubmit, setTugasSubmit] = useState<Assignment[] | null>(null);
  const [success, setSuccess] = useState<string | undefined>("");
  const [error, setError] = useState<string | undefined>("");
  const [isPending, setIsPending] = useState(false);
  const navigate = useNavigate();
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [filePreview, setFilePreview] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const fetchTugasSubmit = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_PUBLIC_API_KEY}/api/modul/${id}/task/${idsubmodul}/show/${userid}`,
        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        }
      );

      const data = response.data.data;

      data.forEach((submission: Assignment) => {
        if (typeof submission.files === "string") {
          submission.files = JSON.parse(submission.files);
        }
      });

      setTugasSubmit(data);
    } catch (err) {
      toast.error("Gagal memuat tugas kamu.");
      console.error(err);
    }
  };

  useEffect(() => {
    fetchTugasSubmit();
  }, [id, idsubmodul]);
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;

    if (files) {
      const newFiles = Array.from(files);
      const newFileNames = newFiles.map((file) => file.name);
      const totalFiles = [...uploadedFiles, ...newFiles];
      if (totalFiles.length > 5) {
        alert("You can only upload a maximum of 5 files.");
        return;
      }

      setUploadedFiles((prevFiles) => [...prevFiles, ...newFiles]);
      setFilePreview((prevFiles) => [...prevFiles, ...newFileNames]);

      // Clear the file input for re-upload
      if (fileInputRef.current) {
        setTimeout(() => {
          fileInputRef.current!.value = "";
        }, 0);
      }
    }
  };

  const handleRemoveFile = (fileName: string) => {
    setFilePreview((prevFiles) =>
      prevFiles.filter((file) => file !== fileName)
    );

    setUploadedFiles((prevFiles) =>
      prevFiles.filter((file) => file.name !== fileName)
    );
  };

  const handleFileDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const files = event.dataTransfer.files;
    if (files) {
      const newFiles = Array.from(files);
      const totalFiles = [...uploadedFiles, ...newFiles];

      if (totalFiles.length > 5) {
        toast.error("You can only upload a maximum of 5 files.");
        return;
      }

      setUploadedFiles((prevFiles) => [...prevFiles, ...newFiles]);
      setFilePreview((prevFiles) => [
        ...prevFiles,
        ...newFiles.map((file) => file.name),
      ]);
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const handleSubmit = async () => {
    setError("");
    setSuccess("");
    setIsPending(true);
    const formData = new FormData();
    formData.append("user_id", userid);
    uploadedFiles.forEach((file) => {
      formData.append("files[]", file);
    });

    const toastId = toast.loading("Uploading File...");

    try {
      await axios.post(
        `${process.env.REACT_PUBLIC_API_KEY}/api/modul/${id}/task/${idsubmodul}/create`,
        formData,
        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        }
      );
      toast.success("Files uploaded successfully!", {
        id: toastId,
        duration: 10000,
      });
      navigate(`/home/modul/${id}/assignment/${idsubmodul}`);
      setUploadedFiles([]);
      setFilePreview([]);
    } catch (error) {
      toast.dismiss(toastId);
      setError("Gagal mengunggah file.");
    } finally {
      setIsPending(false);
    }
  };

  console.log(tugasSubmit);

  if (tugasSubmit && tugasSubmit.length > 0) {
    if (tugasSubmit[0].submited) {
      navigate(`/home/modul/${id}/assignment/${idsubmodul}`);
      toast.error("Tugas sudah di kumpulkan");
    }
  }

  return (
    <>
      {/* Pengumpulan Tugas Untuk Student  */}
      {/* jika tugas submit lebih dari 5 matikan ini  */}
      {tugasSubmit && tugasSubmit.length < 5 && (
        <div
          className="border-dashed border-2  h-[200px] border-gray-400 p-4 mt-5 rounded-lg text-center"
          onDrop={handleFileDrop}
          onDragOver={handleDragOver}
        >
          <div className="flex justify-center flex-col items-center">
            <p className="text-gray-500 mt-12">
              Select a file or drag and drop here only 5 Files
            </p>
            <input
              type="file"
              multiple
              onChange={handleFileChange}
              ref={fileInputRef}
              className="mt-2 text-center w-[200px]"
            />
          </div>
        </div>
      )}
      {/* Display uploaded file names */}
      {filePreview.length > 0 && (
        <div className="mt-4">
          <h3 className="font-semibold">Files to Upload:</h3>
          <ul className="list-disc list-inside mt-2 pl-5 mb-5">
            {filePreview.map((fileName, index) => (
              <li key={index} className="flex justify-between">
                {fileName}
                <Button
                  type="button"
                  onClick={() => handleRemoveFile(fileName)}
                  className="text-red-500 ml-2 bg-transparent shadow-none hover:bg-transparent hover:text-red-950"
                >
                  Remove
                </Button>
              </li>
            ))}
          </ul>
          <FormError message={error} />
          <FormSuccess message={success} />
          <Button
            onClick={handleSubmit}
            disabled={isPending}
            className="mt-2 w-full text-white font-monument-regular"
          >
            Kumpul Tugas
          </Button>
        </div>
      )}
      {/* Files that already submitted */}
      {tugasSubmit && tugasSubmit.length > 0 && (
        <div className="mt-4">
          <h3 className="font-semibold">Files that submitted:</h3>
          <em className="text-sm">Please Delete the file first</em>
          <ul className="list-disc list-inside mt-2 pl-5 mb-5 ">
            {tugasSubmit.map((file: any, index) => (
              <li key={index}>
                <a
                  href={`${process.env.REACT_PUBLIC_API_KEY}/storage/task_collection/${file.files}`}
                  className="underline"
                  download
                >
                  {file.files}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
};

export default StudentSubmit;
