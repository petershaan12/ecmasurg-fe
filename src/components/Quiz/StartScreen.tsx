import { useQuiz } from "@/utils/QuizContext";
import { Button } from "../ui/button";

const StartScreen = () => {
  const { numQuestions, dispatch, state } = useQuiz();

  return (
    <div className="flex flex-col items-center mt-64">
      <h1 className="font-bold text-3xl">The Quiz</h1>
      <h2 className="opacity-80">Welcome to The React Quiz!</h2>
      {numQuestions === 0 ? (
        <h3 className="mt-5 p-4 bg-red-100 text-red-700 rounded-full ">
          No quizzes available. Please come back later.
        </h3>
      ) : (
        <h3>{numQuestions} questions to test your React mastery</h3>
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
