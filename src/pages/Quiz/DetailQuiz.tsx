import MenuSamping from "@/components/MenuSamping";
import { QuizProvider } from "@/utils/QuizContext";
import "./Quiz.css";

import { useParams } from "react-router-dom";
import DetailQuizMain from "./DetailQuizMain";

const DetailQuiz = () => {
  const { category } = useParams();
  return (  
    <>
      <QuizProvider>
        <header className="flex justify-between items-center">
          <div className="flex space-x-5">
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
