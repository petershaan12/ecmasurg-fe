import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { IsiModulSchema } from "../../schema";
import { FormError } from "../form-error";
import { FormSuccess } from "../form-success";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { z } from "zod";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { Trash } from "lucide-react";
import { toast } from "sonner";
import Cookies from "js-cookie";

const EditSubModul = ({ submodul }: any) => {
  const { id } = useParams<{ id: string }>();
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, setIsPending] = useState(false);
  const [filePreview, setFilePreview] = useState<string[]>(
    submodul.files ? JSON.parse(submodul.files) : []
  );
  const [isOwner, setIsOwner] = useState<boolean | null>(null);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const navigate = useNavigate();
  const form = useForm<z.infer<typeof IsiModulSchema>>({
    resolver: zodResolver(IsiModulSchema),
    defaultValues: {
      type: submodul.type || "",
      judul: submodul.judul || "",
      description: submodul.description || "",
      link_video: submodul.link_video || "",
      time: submodul.time || "",
      deadline: submodul.deadline || "",
    },
  });

  useEffect(() => {
    const checkOwnership = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_PUBLIC_API_KEY}/api/modul/isowner/${id}`,
          {
            headers: {
              Accept: "application/json",
              Authorization: `Bearer ${Cookies.get("token")}`,
            },
          }
        );

        if (response.data.isOwner) {
          setIsOwner(true);
        } else {
          toast.error("You are not authorized to create a submodule.");
          setIsOwner(false);
        }
      } catch (error) {
        console.error(error);
        toast.error("Failed to verify module ownership.");
        navigate("/404");
      }
    };

    checkOwnership();
  }, [id, navigate]);

  if (isOwner === null) {
    return <div>Loading...</div>;
  }

  if (!isOwner) {
    return <p>Authorized</p>;
  }

  const onSubmit = async (data: z.infer<typeof IsiModulSchema>) => {
    setError("");
    setSuccess("");
    setIsPending(true);

    const toastId = toast.loading("Updating task...");
    try {
      const formData = new FormData();
      if (data.type && data.judul && data.description) {
        formData.append("judul", data.judul);
        formData.append("description", data.description);
        formData.append("type", data.type);
      }

      if (data.deadline) {
        const formattedTime = new Date(data.deadline)
          .toISOString()
          .slice(0, 16);
        formData.append("deadline", formattedTime);
      }

      if (data.time) {
        const formattedTime = new Date(data.time).toISOString().slice(0, 16);
        formData.append("time", formattedTime);
      }

      if (data.link_video) {
        formData.append("link_video", data.link_video);
      }

      uploadedFiles.forEach((file) => {
        formData.append("files[]", file);
      });

      formData.append("_method", "PATCH");

      const response = await axios.post(
        `${process.env.REACT_PUBLIC_API_KEY}/api/modul/${id}/update/${submodul.id}`,
        formData,
        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
        }
      );

      if (response.status === 200) {
        setSuccess("Task berhasil diedit!");
        form.reset();
        setFilePreview([]);

        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }

        toast.success("Task berhasil diedit!", {
          id: toastId,
        });

        navigate(`/home/modul/${id}`);
      } else {
        console.log(response.data);
        toast.dismiss(toastId);
        setError(response.data);
      }
    } catch (err) {
      setError("Terjadi kesalahan saat edit task.");
      console.error(err);
      toast.dismiss(toastId);
    } finally {
      toast.dismiss(toastId);
      setIsPending(false); // Reset loading state
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;

    if (files) {
      const newFiles = Array.from(files);
      const newFileNames = newFiles.map((file) => file.name);

      setUploadedFiles((prevFiles) => [...prevFiles, ...newFiles]);
      setFilePreview((prevFiles) => [...prevFiles, ...newFileNames]);

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

    // Hapus file dari state `uploadedFiles` berdasarkan nama file
    setUploadedFiles((prevFiles) =>
      prevFiles.filter((file) => file.name !== fileName)
    );
  };

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6 mb-12"
        >
          <div className="space-y-4 md:min-w-[500px] min-w-[250px] text-start">
            <FormField
              control={form.control}
              name="judul"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name Task</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPending}
                      placeholder="Ex: Material 1"
                      type="text"
                      className="bg-white"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Type</FormLabel>
                  <FormControl>
                    <Select
                      value={field.value}
                      onValueChange={field.onChange}
                      disabled={isPending}
                    >
                      <SelectTrigger className=" bg-white">
                        <SelectValue placeholder="Choose The Owner of Modul" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="material">Material</SelectItem>
                        <SelectItem value="assignment">
                          Learning Activites
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      disabled={isPending}
                      placeholder="Your description here"
                      className="bg-white rounded-md placeholder-white/10"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="link_video"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Link Video / Youtube</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPending}
                      placeholder="https://www.youtube.com/channel/UCd6h6zvzXo4vJ1ZJL1B9X8w"
                      type="text"
                      className="bg-white"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* jika ada assignment kasi deadline */}
            {form.watch("type") === "assignment" && (
              <FormField
                control={form.control}
                name="deadline"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Due Date</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        disabled={isPending}
                        type="datetime-local"
                        className="bg-white"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            <FormItem>
              <FormLabel>Upload Files</FormLabel>
              <FormControl>
                <Input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  multiple
                  disabled={isPending}
                  className="bg-white"
                />
              </FormControl>
              <FormMessage />
            </FormItem>

            {filePreview.length > 0 && (
              <div className="mt-2">
                <strong>Files to be uploaded:</strong>
                <ul>
                  {filePreview.map((fileName, index) => (
                    <li key={index} className="flex justify-between">
                      {fileName}
                      <Button
                        type="button"
                        onClick={() => handleRemoveFile(fileName)}
                        className="text-red-500 ml-2 bg-transparent shadow-none hover:bg-transparent hover:text-red-950"
                      >
                        <Trash width={20} />
                      </Button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            <FormField
              control={form.control}
              name="time"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Assign to Date</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPending}
                      type="datetime-local"
                      className="bg-white"
                    />
                  </FormControl>
                  <FormDescription>
                    Assign the task to a specific Date, The Default will be
                    today
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormError message={error} />
            <FormSuccess message={success} />
            <Button
              type="submit"
              disabled={isPending}
              className="w-full text-white font-monument-regular"
            >
              Update Task
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
};

export default EditSubModul;
