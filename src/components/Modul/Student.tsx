import { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import HapusAssignment from "./HapusAssignment";
import Cookies from "js-cookie";

type StudentProps = {
  id: string | undefined;
  idsubmodul: string | undefined;
  userid: string | "";
};

type SubmissionData = {
  id: string;
  files: { fileName: string; url: string }[]; // Menggunakan array untuk menampung beberapa file
  grade: number;
  feedback: string;
  submited: boolean;
};

const Student = ({ id, idsubmodul, userid }: StudentProps) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [submission, setSubmission] = useState<SubmissionData | null>(null);

  useEffect(() => {
    const fetchTugasSubmit = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `${process.env.REACT_PUBLIC_API_KEY}/api/modul/${id}/task/${idsubmodul}/show/${userid}`,
          {
            headers: {
              Accept: "application/json",
              Authorization: `Bearer ${Cookies.get("token")}`,
            },
          }
        );

        const data = response.data.data;

        data.forEach((submission: any) => {
          if (typeof submission.files === "string") {
            submission.files = JSON.parse(submission.files); // Mengubah menjadi array jika berbentuk string JSON
          }
        });

        setSubmission(data[0]);
      } catch (err) {
        toast.error("Gagal memuat tugas kamu.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchTugasSubmit();
  }, [id, idsubmodul, userid]);

  if (loading) return <p className="mt-8">Loading...</p>;

  return (
    <div className="mt-8 w-full">
      {submission && submission.submited ? (
        <div>
          <div className="flex space-x-12">
            <div>
              <h3>File Submissions</h3>
              <ul className="list-disc list-inside mt-2 pl-5 mb-5 ">
                {submission &&
                  submission.files.map((file: any, index) => (
                    <li key={index}>
                      <a
                        href={`${process.env.REACT_PUBLIC_API_KEY}/storage/task_collection/${file}`}
                        className="underline"
                        download
                      >
                        {file}
                      </a>
                    </li>
                  ))}
              </ul>
            </div>

            <div>
              <h3>Grade</h3>
              <p className="text-2xl font-bold mt-2">
                {submission ? submission.grade : "Loading..."}
              </p>
            </div>
          </div>

          <div className="my-8">
            <h3>Comments</h3>
            <p className="italic ml-2">
              {submission ? submission.feedback : "Loading..."}
            </p>
          </div>

          <div className="w-full">
            <HapusAssignment id={submission.id} idsubmodul={idsubmodul || ""} />
          </div>
        </div>
      ) : (
        <Link to="submit">
          <Button className="w-full">Create Submission</Button>
        </Link>
      )}
    </div>
  );
};

export default Student;
