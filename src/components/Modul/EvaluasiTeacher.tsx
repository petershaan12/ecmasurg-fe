import { useEffect, useState } from "react";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { toast } from "sonner";
import HapusEvaluasiStudent from "./HapusEvaluasiStudent";
import Cookies from "js-cookie";

interface Evaluasi {
  id: string;
  user: {
    name: string;
    id: string;
  };
  created_at: string;
  answer1?: string;
  answer2?: string;
  answer3?: string;
  answer4?: string;
  answer5?: string;
}

type TeacherProps = {
  idevaluasi: string | undefined;
  idmodul: string | undefined;
};

const EvaluasiTeacher = ({ idevaluasi, idmodul }: TeacherProps) => {
  const [evaluasi, setEvaluasi] = useState<Evaluasi[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const fetchSubmissions = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(
        `${process.env.REACT_PUBLIC_API_KEY}/api/answerevaluasi/${idevaluasi}`,
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
        }
      );

      const data = response.data.data;
      setEvaluasi(data);
    } catch (error) {
      toast.error("Failed to fetch data.");
      console.error("Failed to fetch evaluasi", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchSubmissions();
  }, [idmodul, idevaluasi]);

  return (
    <div className="mt-8">
      <h2 className="text-xl font-bold mb-4">List Evaluasi</h2>

      {isLoading ? (
        <div>Loading..</div>
      ) : (
        <Table className="w-full border-collapse">
          <TableHeader>
            <TableRow className="bg-gray-100">
              <TableHead className="border p-2 font-semibold">Name</TableHead>
              <TableHead className="border p-2 font-semibold">Waktu</TableHead>
              <TableHead className="border p-2 font-semibold">
                Answer 1
              </TableHead>
              <TableHead className="border p-2 font-semibold">
                Answer 2
              </TableHead>
              <TableHead className="border p-2 font-semibold">
                Answer 3
              </TableHead>
              <TableHead className="border p-2 font-semibold">
                Answer 4
              </TableHead>
              <TableHead className="border p-2 font-semibold">
                Answer 5
              </TableHead>
              <TableHead className="border p-2 font-semibold">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {evaluasi.map((evaluasi) => (
              <TableRow key={evaluasi.user.id}>
                <TableCell className="border p-2">
                  {evaluasi.user.name}
                </TableCell>

                <TableCell className="border p-2">
                  {new Date(evaluasi.created_at).toLocaleString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                    hour: "numeric",
                    minute: "numeric",
                    hour12: true,
                  })}
                </TableCell>
                <TableCell className="border p-2">{evaluasi.answer1}</TableCell>
                <TableCell className="border p-2">{evaluasi.answer2}</TableCell>
                <TableCell className="border p-2">{evaluasi.answer3}</TableCell>
                <TableCell className="border p-2">{evaluasi.answer4}</TableCell>
                <TableCell className="border p-2">{evaluasi.answer5}</TableCell>
                <TableCell className="border p-2">
                  <HapusEvaluasiStudent
                    id={evaluasi.id}
                    idevaluasi={idevaluasi}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
};

export default EvaluasiTeacher;
