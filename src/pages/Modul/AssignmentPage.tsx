import React, { useEffect, useState, useRef } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import MenuSamping from "@/components/MenuSamping";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";
import { toast } from "sonner";
import { useSelector } from "react-redux";

type Assignment = {
  id: string;
  idsubmodul: string;
  judul: string;
  description: string;
  link_video: string;
  files: string[];
};

const AssignmentPage = () => {
  const { id, idsubmodul } = useParams<{ id: string; idsubmodul: string }>();
  const user = useSelector((state: any) => state.data);
  const [tugas, setTugas] = useState<Assignment | null>(null);
  const [tugasSubmit, setTugasSubmit] = useState<Assignment | null>(null);
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, setIsPending] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [filePreview, setFilePreview] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const navigate = useNavigate();

  const fetchTugas = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_PUBLIC_API_KEY}/api/modul/${id}/show/${idsubmodul}`,
        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      const data = response.data.data;
      if (typeof data.files === "string") {
        data.files = JSON.parse(data.files);
      }

      setTugas(data);
    } catch (err) {
      setError("Gagal memuat tugas.");
      console.error(err);
    }
  };

  const fetchTugasSubmit = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_PUBLIC_API_KEY}/api/modul/${id}/task/${idsubmodul}`,
        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      const data = response.data.data;
      if (typeof data.files === "string") {
        data.files = JSON.parse(data.files);
      }
      setTugasSubmit(data);
    } catch (err) {
      toast.error("Gagal memuat tugas kamu.");
      console.error(err);
    }
  };

  console.log(tugasSubmit);

  useEffect(() => {
    fetchTugas();
    fetchTugasSubmit();
  }, [id, idsubmodul]);

  if (!tugas) {
    return <div>Loading...</div>;
  }

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;

    if (files) {
      const newFiles = Array.from(files);
      const newFileNames = newFiles.map((file) => file.name);

      // Filter new files to ensure we only add unique files and limit to 5
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
    formData.append("user_id", user.id);
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
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      toast.success("Files uploaded successfully!", {
        id: toastId,
      });
      setUploadedFiles([]); // Clear uploaded files after submission
      setFilePreview([]); // Clear file previews
    } catch (error) {
      toast.dismiss(toastId);
      setError("Gagal mengunggah file.");
    } finally {
      setIsPending(false);
      toast.dismiss(toastId);
    }
  };

  return (
    <>
      <header className="flex justify-between">
        <div className="flex space-x-5 items-center">
          <button onClick={() => navigate(-1)}>
            <ArrowLeft />
          </button>
          <h1 className="text-base">
            <Link to="/modul" className="hover:underline">
              Modul
            </Link>{" "}
            /{" "}
            <Link to={`/modul/${id}`} className="hover:underline">
              Sub Modul
            </Link>
            / {tugas.judul}
          </h1>
        </div>
        <MenuSamping />
      </header>

      <main className="mt-8">
        {/* Judul */}
        <h1 className="text-2xl font-bold">{tugas.judul}</h1>

        {/* Deskripsi */}
        <div className="bg-white p-5 rounded-lg shadow mt-5">
          <p className="mt-2">{tugas.description}</p>

          {tugas.link_video && (
            <p>
              Silahkan nonton video ini <a href={tugas.link_video}>disini</a>
            </p>
          )}

          {/* Jika ada file, berikan list link untuk mendownload */}
          {tugas.files && tugas.files.length > 0 && (
            <div className="mt-4">
              <h2 className="text-gray-400 font-semibold">
                Download File Tugas
              </h2>
              <ul className="list-disc list-inside mt-2 pl-5">
                {tugas.files.map((file, index) => (
                  <li key={index}>
                    <a
                      href={`${process.env.REACT_PUBLIC_API_KEY}/storage/files/${file}`}
                      className="underline"
                      download
                    >
                      {file}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Pengumpulan Tugas */}
        <div
          className="border-dashed border-2  h-[200px] border-gray-400 p-4 mt-5 rounded-lg text-center"
          onDrop={handleFileDrop}
          onDragOver={handleDragOver}
        >
          <div className="flex justify-center flex-col items-center">
            <p className="text-gray-500 mt-12">
              Select a file or drag and drop here
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
              Upload Files
            </Button>
          </div>
        )}

        <div className="mt-4">
          <h3 className="font-semibold">Files that already submitted:</h3>
          <ul className="list-disc list-inside mt-2 pl-5 mb-5">
            {tugasSubmit.map((fileName, index) => (
              <li key={index} className="flex justify-between">
                {fileName.files}
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
        </div>
      </main>
    </>
  );
};

export default AssignmentPage;
