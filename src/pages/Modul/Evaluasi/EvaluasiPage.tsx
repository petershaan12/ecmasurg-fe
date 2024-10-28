import React, { useState, useEffect } from "react";
import Loading from "@/components/Loading";
import MenuSamping from "@/components/MenuSamping";
import axios from "axios";
import { ArrowLeft } from "lucide-react";
import { useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

interface Question {
  question: string;
  type: string;
}

const EvaluasiPage: React.FC = () => {
  const { id, idevaluasi } = useParams<{ id: string; idevaluasi: string }>();
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const user = useSelector((state: any) => state.data);
  const [evaluasi, setEvaluasi] = useState<any>({});
  const [answers, setAnswers] = useState<Record<string, string | number>>({});

  useEffect(() => {
    const fetchEvaluasi = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `${process.env.REACT_PUBLIC_API_KEY}/api/modul/evaluasi/${id}/show/${idevaluasi}`,
          {
            headers: {
              Accept: "application/json",
              Authorization: `Bearer ${sessionStorage.getItem("token")}`,
            },
          }
        );
        setEvaluasi(response.data.data);
      } catch (error) {
        toast.error("Failed to fetch Evaluasi.");
      } finally {
        setLoading(false);
      }
    };

    fetchEvaluasi();
  }, []);

  const handleInputChange = (questionKey: string, value: string | number) => {
    setAnswers({
      ...answers,
      [questionKey]: value,
    });
  };

  const handleSubmit = async () => {
    try {
      await axios.post(
        `${process.env.REACT_PUBLIC_API_KEY}/api/modul/evaluasi/${id}/submit/${idevaluasi}`,
        answers,
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        }
      );
      toast.success("Evaluasi submitted successfully!");
      navigate(`/modul/${id}`); // Redirect after successful submission
    } catch (error) {
      toast.error("Failed to submit evaluasi. Try again later.");
      navigate(`/modul/${id}`);
    }
  };

  if (loading) return <Loading />;

  const renderQuestion = (
    index: number,
    questionKey: string,
    questionText: string,
    type: string
  ) => {
    switch (type) {
      case "0": // Textarea type question
        return (
          <div key={questionKey} className="mt-4 font-roboto">
            <label htmlFor={questionKey} className="block text-sm font-bold">
              {index + 1}. {questionText}
            </label>
            <textarea
              id={questionKey}
              rows={4}
              className="mt-1 block w-full border border-black rounded-md p-2"
              onChange={(e) => handleInputChange(questionKey, e.target.value)}
            ></textarea>
          </div>
        );
      case "1":
        return (
          <div key={questionKey} className="mt-4 font-roboto">
            <label className="block text-sm font-bold">
              {index + 1}. {questionText}{" "}
              <span className=" opacity-80 font-light italic">
                {" "}
                1= Strongly Agree, 5 = Strongly Disagree.
              </span>
            </label>
            <div className="mt-2 flex space-x-2">
              {[1, 2, 3, 4, 5].map((num) => (
                <button
                  key={num}
                  onClick={() => handleInputChange(questionKey, num)}
                  className={`px-4 py-2 border w-full  border-black rounded-lg shadow-md font-bold ${
                    answers[questionKey] === num
                      ? "bg-primary text-white"
                      : "bg-white"
                  }`}
                >
                  {num}
                </button>
              ))}
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <>
      <header className="flex justify-between">
        <div className="flex space-x-5 items-center">
          <button onClick={() => navigate(-1)}>
            <ArrowLeft className="hover:bg-primary/20 rounded-full" />
          </button>
          <h1 className="text-base flex items-center">
            <Link to="/modul" className="hover:underline">
              Modul Pembelajaran
            </Link>
            /
            <Link
              to={`/modul/${evaluasi.modul.id}`}
              className="hover:underline"
            >
              <span>{evaluasi.modul.judul}</span>
            </Link>
            / <span>{evaluasi.title}</span>
          </h1>
        </div>
        <MenuSamping />
      </header>

      <main className="mt-8">
        <h1 className="text-2xl font-bold">{evaluasi.title}</h1>
        <p className="text-sm">
          Deadline Submission{" "}
          <b>
            {new Date(evaluasi.deadline).toLocaleString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
              hour: "numeric",
              minute: "numeric",
              hour12: true,
            })}
          </b>
        </p>

        {/* Form Section */}
        <div className="mt-6 space-y-4">
          {Object.keys(evaluasi).map((_key, index) => {
            const questionText = evaluasi[`question${index + 1}`];
            const type = evaluasi[`type${index + 1}`];
            if (questionText && type !== undefined) {
              return renderQuestion(
                index,
                `question${index + 1}`,
                questionText,
                type
              );
            }
            return null;
          })}
        </div>

        <div className="mt-6">
          <Button
            className="px-4 py-2 w-full text-white rounded-md "
            onClick={handleSubmit}
          >
            Kirim Evaluasi
          </Button>
        </div>
      </main>
    </>
  );
};

export default EvaluasiPage;
