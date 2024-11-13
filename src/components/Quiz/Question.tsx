import { useQuiz } from "@/utils/QuizContext";
import Options from "./Options";

const Question = () => {
  const { state } = useQuiz();
  const question: any = state.questions.at(state.index) ?? {
    question: "No question available",
  };


  return (
    <div className="flex items-center flex-col">
      <h4 className="text-center font-medium   ">{question?.question}</h4>
      <Options question={question} />
    </div>
  );
};

export default Question;
