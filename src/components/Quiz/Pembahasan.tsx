import { useQuiz } from "@/utils/QuizContext";

const Pembahasan = () => {
  const { state } = useQuiz();

  const hasAnswered = state.answer !== null;

  const question: any = state.questions.at(state.index) ?? {
    question: "No question available",
  };

  return (
    <>
      {hasAnswered && (
        <p className="mt-5">
          <h1 className="font-bold text-xl">Pembahasan</h1>
          {question?.pembahasan}
        </p>
      )}
    </>
  );
};

export default Pembahasan;
