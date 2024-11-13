import { Button } from "@/components/ui/button";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

type EvaluasiProps = {
  evaluasi: any;
  idmodul: any;
  idevaluasi: any;
};

const EvaluasiStudent = ({ evaluasi, idmodul, idevaluasi }: EvaluasiProps) => {
  const navigate = useNavigate();
  const [answers, setAnswers] = useState<Record<string, string | number>>({});
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

  const handleInputChange = (questionKey: string, value: string | number) => {
    setAnswers({
      ...answers,
      [questionKey]: value,
    });
  };

  const handleSubmit = async () => {

    const formattedAnswers = Object.keys(answers).reduce(
      (acc, questionKey, index) => {
        acc[`answer${index + 1}`] = String(answers[questionKey]);
        return acc;
      },
      {} as Record<string, string>
    );

    try {
      await axios.post(
        `${process.env.REACT_PUBLIC_API_KEY}/api/answerevaluasi/${idevaluasi}`,
        formattedAnswers,
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        }
      );
      toast.success("Evaluasi submitted successfully!");
      navigate(`/home/modul/${idmodul}`); // Redirect after successful submission
    } catch (error) {
      toast.error("Failed to submit evaluasi. Try again later.");
      navigate(`/home/modul/${idmodul}`);
    }
  };

  return (
    <>
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
    </>
  );
};

export default EvaluasiStudent;
