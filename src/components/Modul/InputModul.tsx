import {
  Form,
  FormControl,
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
import { ModulSchema } from "../../schema";
import { FormError } from "../form-error";
import { FormSuccess } from "../form-success";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { z } from "zod";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useSelector } from "react-redux";

const InputModul = () => {
  const apiURL = process.env.REACT_PUBLIC_API_KEY;
  const user = useSelector((state: any) => state.data);
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [errorImage, setErrorImage] = useState<string | undefined>();
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [isFileSizeValid, setIsFileSizeValid] = useState(true);
  const [teachers, setTeachers] = useState([]);
  const [isPending, setIsPending] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const navigate = useNavigate();
  const form = useForm<z.infer<typeof ModulSchema>>({
    resolver: zodResolver(ModulSchema),
    defaultValues: {
      name: "",
      owner: "",
      description: "",
      bannerImage: "",
    },
  });

  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const response = await axios.get(`${apiURL}/api/modul/asignteacher`, {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        });
        setTeachers(response.data.data);
      } catch (error) {
        console.error("Error fetching teachers:", error);
        setError("Terjadi kesalahan saat mengambil daftar guru.");
      }
    };

    fetchTeachers();
  }, []);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setErrorImage("");
    const file = e.target.files?.[0];
    if (file) {
      const fileType = file.type;
      const validTypes = ["image/png", "image/jpeg", "image/jpg"];
      if (validTypes.includes(fileType)) {
        if (file.size <= 2048 * 1024) {
          setPreviewImage(URL.createObjectURL(file));
          form.setValue("bannerImage", e.target.files);
          setIsFileSizeValid(true);
        } else {
          setErrorImage("Image is more than 5MB");
          setIsFileSizeValid(false);
        }
      } else {
        setErrorImage("Only .png or .jpg files are accepted");
        setIsFileSizeValid(false);
      }
    }
  };

  const onSubmit = async (data: z.infer<typeof ModulSchema>) => {
    setError("");
    setSuccess("");
    setIsPending(true);

    const toastId = toast.loading("Add modul...");
    try {
      teachers.forEach((teacher: any) => {
        if (teacher.name === data.owner) {
          data.owner = teacher.id;
        }
      });

      const formData = new FormData();
      if (data.name && data.description && data.owner) {
        formData.append("judul", data.name);
        formData.append("description", data.description);
        formData.append("asignd_teacher", data.owner);
      }
      if (data.bannerImage) {
        formData.append("gambar_modul", data.bannerImage[0]);
      }

      // Send a POST request to Laravel API using axios
      const response = await axios.post(
        `${apiURL}/api/modul/create`,
        formData,
        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        }
      );

      if (response.status === 201) {
        setSuccess("Modul berhasil ditambahkan!");
        form.reset();

        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
        setPreviewImage(null);
        toast.success("Modul berhasil ditambahkan!", {
          id: toastId,
        });
        navigate("/modul");
      } else {
        console.log(response.data);
        toast.dismiss(toastId);
        setError(response.data);
      }
    } catch (err) {
      toast.dismiss(toastId);
      setError("Terjadi kesalahan saat menambahkan modul.");
      console.error(err);
    } finally {
      setIsPending(false);
    }
  };

  if (user.roles !== "teacher") {
    return <Navigate to="/404" />;
  }

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
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nama Modul</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPending}
                      placeholder="Ex: Sistem Muskulosektual"
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
              name="owner"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Pemilik Modul</FormLabel>
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
                        {teachers.map((teacher: any) => (
                          <SelectItem key={teacher.id} value={teacher.name}>
                            {teacher.name}
                          </SelectItem>
                        ))}
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
                  <FormLabel>Deskripsi Modul</FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      disabled={isPending}
                      placeholder="Deskripsi Modul"
                      className="bg-white  rounded-md placeholder-white/10"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password for Generate Modul</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPending}
                      placeholder="Ex: 123456"
                      type="text"
                      className="bg-white"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            /> */}
            <FormField
              control={form.control}
              name="bannerImage"
              render={() => (
                <FormItem>
                  <FormLabel>Banner Image *jika perlu</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isPending}
                      id="picture"
                      type="file"
                      className="bg-white"
                      onChange={handleImageChange}
                      ref={fileInputRef}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {previewImage && (
              <img src={previewImage} alt="preview" width={200} height={200} />
            )}
            <FormError message={errorImage} />
            <FormError message={error} />
            <FormSuccess message={success} />
            <Button
              type="submit"
              disabled={isPending || !isFileSizeValid}
              className="w-full text-white font-monument-regular "
            >
              Tambah Modul pembelajaran
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
};

export default InputModul;
