import { useEffect, useState } from "react";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"; // pastikan style importnya dari shadcdn atau sesuai library
import { toast } from "sonner";
import Loading from "../Loading";

interface Submission {
  user: {
    name: string;
  };
  files: string[];
  created_at: string;
  map: (arg0: (file: any, index: number) => JSX.Element) => JSX.Element[];
}

type TeacherProps = {
  id: string | undefined;
  idsubmodul: string | undefined;
};

const Teacher = ({ id, idsubmodul }: TeacherProps) => {
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const fetchSubmissions = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(
        `${process.env.REACT_PUBLIC_API_KEY}/api/modul/${id}/task/${idsubmodul}`,
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        }
      );

      const data = response.data.data;

      // Memastikan setiap submission memiliki files sebagai array
      data.forEach((submission: Submission) => {
        if (typeof submission.files === "string") {
          submission.files = JSON.parse(submission.files);
        }
      });

      setSubmissions(data);
    } catch (error) {
      toast.error("Failed to fetch data.");
      console.error("Failed to fetch submissions", error);
    } finally {
      setIsLoading(false); // Selesai loading
    }
  };

  useEffect(() => {
    fetchSubmissions();
  }, [id, idsubmodul]);

  return (
    <div className="mt-8">
      <h2 className="text-xl font-bold mb-4">List Submission</h2>

      {isLoading ? (
        <div>Loading..</div>
      ) : (
        <Table className="w-full border-collapse">
          <TableHeader>
            <TableRow className="bg-gray-100">
              <TableHead className="border p-2 font-semibold">Name</TableHead>
              <TableHead className="border p-2 font-semibold">
                File Submit
              </TableHead>
              <TableHead className="border p-2 font-semibold">
                Jam Pengumpulan
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {submissions.map((submission, index) => (
              <TableRow key={index}>
                {/* Nama Pengguna */}
                <TableCell className="border p-2">
                  {submission.user.name}
                </TableCell>

                {/* Daftar File yang Disubmit */}
                <TableCell className="border p-2">
                  <ul>
                    {submission.files.map((file: string, index) => (
                      <li key={index}>
                        <a
                          href={`${process.env.REACT_PUBLIC_API_KEY}/storage/task_collection/${file}`}
                          className="underline text-blue-400"
                          download
                        >
                          {file}
                        </a>
                      </li>
                    ))}
                  </ul>
                </TableCell>

                {/* Waktu Pengumpulan */}
                <TableCell className="border p-2">
                  {new Date(submission.created_at).toLocaleString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                    hour: "numeric",
                    minute: "numeric",
                    hour12: true,
                  })}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
};

export default Teacher;
