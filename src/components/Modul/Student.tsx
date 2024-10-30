import { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";

type StudentProps = {
  id: string | undefined;
  idsubmodul: string | undefined;
  userid: string | "";
};

type SubmissionData = {
  fileName: string;
  grade: number;
  comments: string;
};

const Student = ({ id, idsubmodul, userid }: StudentProps) => {
  const [submission, setSubmission] = useState<SubmissionData | null>(null);

  useEffect(() => {
    // Dummy data fetching simulation with axios
    axios
      .get("/api/submission", {
        params: { id, idsubmodul, userid },
      })
      .then((response) => {
        // In a real case, response data would come from your backend.
        // Here we're setting dummy data directly.
        setSubmission({
          fileName: "1.png",
          grade: 100,
          comments: "Great work! Well done on the assignment.",
        });
      })
      .catch((error) => {
        console.error("Error fetching submission data:", error);
      });
  }, [id, idsubmodul, userid]);

  return (
    <div className="mt-12 w-full">
      <div className="flex space-x-12">
        <div>
          <h3>File Submissions</h3>
          {submission ? (
            <p>
              <a href="#">{submission.fileName}</a>
            </p>
          ) : (
            <p>Loading...</p>
          )}
        </div>

        <div>
          <h3>Grade</h3>
          <p className="font-bold text-2xl">
            {submission ? submission.grade : "Loading..."}
          </p>
        </div>
      </div>

      <div className="mt-12">
        <h3>Comments</h3>
        <p>{submission ? submission.comments : "Loading..."}</p>
      </div>

      <Button className="mt-8">
        <Link to="submit">Edit Submission</Link>
      </Button>
    </div>
  );
};

export default Student;
