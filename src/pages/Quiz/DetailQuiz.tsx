import MenuSamping from "@/components/MenuSamping";
import { QuizProvider } from "@/utils/QuizContext";
import "./Quiz.css";

import { useNavigate, useParams } from "react-router-dom";
import DetailQuizMain from "./DetailQuizMain";
import { ArrowLeft } from "lucide-react";

const DetailQuiz = () => {
  const navigate = useNavigate();
  const { category } = useParams();
  return (
    <>
      <QuizProvider>
        <header className="flex justify-between items-center">
          <div className="flex space-x-5">
            <button
              onClick={() => {
                navigate(-1);
              }}
            >
              <ArrowLeft className="hover:bg-primary/20 rounded-full" />
            </button>
            <h1 className="md:text-xl font-bold">Quiz {category}</h1>
          </div>
          <MenuSamping />
        </header>

        <main className="mt-8">
          <DetailQuizMain />
        </main>
      </QuizProvider>
    </>
  );
};

export default DetailQuiz;
