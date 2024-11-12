import { useQuiz } from "@/utils/QuizContext";
import { Button } from "../ui/button";

const NextButton = () => {
  const { dispatch, state, numQuestions } = useQuiz();

  if (state.answer === null) return null;

  if (state.index < numQuestions - 1)
    return (
      <Button onClick={() => dispatch({ type: "nextQuestion" })}>Next</Button>
    );

  if (state.index === numQuestions - 1)
    return <Button onClick={() => dispatch({ type: "finish" })}>Finish</Button>;
};

export default NextButton;
