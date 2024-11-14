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
import Cookies from "js-cookie";

interface Submission {
  id: string;
  user: {
    name: string;
    id: string;
  };
  files: string[];
  created_at: string;
  grade?: number;
  feedback?: string;
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
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
        }
      );

      const data = response.data.data.map((submission: Submission) => ({
        ...submission,
        files:
          typeof submission.files === "string"
            ? JSON.parse(submission.files)
            : submission.files,
        grade: submission.grade || 0,
        feedback: submission.feedback || "",
      }));

      setSubmissions(data);
    } catch (error) {
      toast.error("Failed to fetch data.");
      console.error("Failed to fetch submissions", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchSubmissions();
  }, [id, idsubmodul]);

  const handleInputChange = (
    index: number,
    field: "grade" | "feedback",
    value: string | number
  ) => {
    setSubmissions((prevSubmissions) =>
      prevSubmissions.map((submission, i) =>
        i === index ? { ...submission, [field]: value } : submission
      )
    );
  };

  // Handle submission of grade and comments for a specific user
  const handleSubmitGrade = async (submission: Submission) => {
    if (submission.grade === undefined || !submission.feedback) {
      toast.error("Please enter both grade and comments.");
      return;
    }

    try {
      await axios.post(
        `${process.env.REACT_PUBLIC_API_KEY}/api/modul/gradetask/${submission.id}`,
        {
          userId: submission.user.id,
          grade: submission.grade,
          feedback: submission.feedback,
        },
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
        }
      );
      toast.success("Grade and comments submitted successfully.");
    } catch (error) {
      toast.error("Failed to submit grade and comments.");
      console.error("Error submitting grade and comments", error);
    }
  };

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
              <TableHead className="border p-2 font-semibold">Grade</TableHead>
              <TableHead className="border p-2 font-semibold">
                Comments
              </TableHead>
              <TableHead className="border p-2 font-semibold">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {submissions.map((submission, index) => (
              <TableRow key={submission.user.id}>
                <TableCell className="border p-2">
                  {submission.user.name}
                </TableCell>
                <TableCell className="border p-2">
                  <ul>
                    {submission.files.map((file, i) => (
                      <li key={i}>
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
                <TableCell className="border p-2">
                  <input
                    type="number"
                    placeholder="Grade"
                    value={submission.grade || ""}
                    onChange={(e) =>
                      handleInputChange(index, "grade", Number(e.target.value))
                    }
                    className="border rounded p-1 w-full"
                  />
                </TableCell>
                <TableCell className="border p-2">
                  <input
                    type="textarea"
                    placeholder="Comments"
                    value={submission.feedback || ""}
                    onChange={(e) =>
                      handleInputChange(index, "feedback", e.target.value)
                    }
                    className="border rounded p-1 w-full h-24"
                  />
                </TableCell>
                <TableCell className="border p-2">
                  <button
                    onClick={() =>
                      handleSubmitGrade({ ...submission, id: submission.id })
                    }
                    className="bg-blue-500 text-white px-3 py-1 rounded"
                  >
                    Submit
                  </button>
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
