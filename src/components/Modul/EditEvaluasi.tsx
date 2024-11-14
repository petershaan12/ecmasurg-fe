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
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { IsiEvaluasiSchema } from "../../schema";
import { FormError } from "../form-error";
import { FormSuccess } from "../form-success";
import { Button } from "../ui/button";
import { z } from "zod";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import Cookies from "js-cookie";

type EvaluasiForm = z.infer<typeof IsiEvaluasiSchema> & {
  [key: `question${number}`]: string;
  [key: `type${number}`]: string;
};

const EditEvaluasi = ({ evaluasi }: any) => {
  const { id } = useParams<{ id: string }>();
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");

  const [isPending, setIsPending] = useState(false);
  const navigate = useNavigate();

  const initialQuestionCount = Object.keys(evaluasi).filter(
    (key) => key.startsWith("question") && evaluasi[key] !== null
  ).length;
  const [questionCount, setQuestionCount] = useState(initialQuestionCount);

  const time = new Date()
    .toLocaleString("sv-SE", {
      timeZone: "Asia/Jakarta",
      hour12: false,
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    })
    .replace(" ", "T");

  const form = useForm<EvaluasiForm>({
    resolver: zodResolver(IsiEvaluasiSchema),
    defaultValues: {
      judul: evaluasi.title || "",
      deadline: evaluasi.deadline || "",
      time: evaluasi.time || time.toString(),
    },
  });

  useEffect(() => {
    for (let i = 1; i <= 5; i++) {
      if (evaluasi[`question${i}`] && evaluasi[`type${i}`]) {
        form.setValue(`question${i}`, evaluasi[`question${i}`]);
        form.setValue(`type${i}`, evaluasi[`type${i}`]);
      }
    }
  }, []);

  const onSubmit = async (data: EvaluasiForm) => {
    setError("");
    setSuccess("");
    setIsPending(true);

    const toastId = toast.loading("Edit Evaluasi...");

    try {
      const formData = new FormData();
      if (data.judul && data.deadline && data.time) {
        formData.append("title", data.judul);
        formData.append("deadline", data.deadline);
        formData.append("time", data.time);
      }

      for (let i = 1; i <= questionCount; i++) {
        const questionValue = form.getValues(`question${i}`);
        const typeValue = form.getValues(`type${i}`);

        if (questionValue) {
          formData.append(`question${i}`, questionValue);
        }
        if (typeValue) {
          formData.append(`type${i}`, typeValue);
        }
      }

      formData.append("_method", "PATCH");

      const response = await axios.post(
        `${process.env.REACT_PUBLIC_API_KEY}/api/modul/evaluasi/${id}/update/${evaluasi.id}`,
        formData,
        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
        }
      );

      if (response.status === 200) {
        form.reset();
        toast.success("Evaluasi berhasil diedit!", {
          id: toastId,
        });
        navigate(`/home/modul/${evaluasi.modul_id}`);
      } else {
        console.log(response.data);
        toast.dismiss(toastId);
        setError(response.data);
      }
    } catch (err) {
      toast.dismiss(toastId);
      setError("Terjadi kesalahan saat menambahkan Evaluasi.");
      console.error(err);
    } finally {
      setIsPending(false);
    }
  };

  const addQuestion = () => {
    if (questionCount < 5) {
      setQuestionCount((prev) => prev + 1);
    }
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
                  <FormLabel>Nama Evaluasi</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPending}
                      placeholder="Ex: Evaluasi 1"
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
            {[...Array(questionCount)].map((_, index) => {
              const questionIndex = index + 1;
              return (
                <div key={questionIndex}>
                  <FormItem>
                    <FormLabel>{`Pertanyaan ${questionIndex}`}</FormLabel>
                    <FormControl>
                      <Input
                        value={form.watch(`question${questionIndex}`) ?? ""}
                        onChange={(e) =>
                          form.setValue(
                            `question${questionIndex}`,
                            e.target.value
                          )
                        }
                        disabled={isPending}
                        placeholder={`Ex: Bagaimana Pembelajaran Hari Ini?`}
                        type="text"
                        className="bg-white"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                  <FormItem>
                    <FormControl>
                      <Select
                        value={form.watch(`type${questionIndex}`)}
                        onValueChange={(value) =>
                          form.setValue(`type${questionIndex}`, value)
                        }
                        disabled={isPending}
                      >
                        <SelectTrigger className=" bg-white">
                          <SelectValue placeholder="Choose The Type of Evaluation" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="0">Textarea</SelectItem>
                          <SelectItem value="1">Satisfaction (1-5)</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                </div>
              );
            })}
            <Button
              type="button"
              onClick={addQuestion}
              disabled={isPending || questionCount >= 5}
              className="mt-2"
            >
              Tambah Pertanyaan
            </Button>
            <FormError message={error} />
            <FormSuccess message={success} />
            <Button
              type="submit"
              disabled={isPending}
              className="w-full text-white font-monument-regular"
            >
              Edit Evaluasi
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
};

export default EditEvaluasi;
