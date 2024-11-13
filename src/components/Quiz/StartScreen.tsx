import { useQuiz } from "@/utils/QuizContext";
import { Button } from "../ui/button";

interface StartScreenProps {
  judul: string;
}

const StartScreen = ({ judul }: StartScreenProps) => {
  const { numQuestions, dispatch, state } = useQuiz();

  return (
    <div className="flex flex-col items-center mt-32">
      <h1 className="font-bold text-3xl">Are You Ready?</h1>
      <h2 className="text-center text-sm mt-3">
        Each question will be timed for 30 seconds, and every submission will be
        recorded! The result will be shown after you click the answer.
      </h2>
      {numQuestions === 0 ? (
        <h3 className="mt-5 p-4 bg-red-100 text-red-700 rounded-full ">
          No quizzes available. Please come back later.
        </h3>
      ) : (
        <h3 className="mt-5">
          <strong> {numQuestions} questions </strong> to test your quiz about{" "}
          {judul}
        </h3>
      )}
      {!state.canStartQuiz && numQuestions > 0 && (
        <h3 className="mt-5 p-4 bg-red-100 text-red-700 rounded-full ">
          You have already taken the quiz this week.{" "}
          <strong>Come Back Next Week ya !</strong>
        </h3>
      )}
      {state.canStartQuiz && numQuestions > 0 && (
        <Button className="mt-8" onClick={() => dispatch({ type: "start" })}>
          Let's start
        </Button>
      )}
    </div>
  );
};

export default StartScreen;
