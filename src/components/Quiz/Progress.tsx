import { useQuiz } from "@/utils/QuizContext";

const Progress = () => {
  const { numQuestions, state, maxPossiblePoints } = useQuiz();

  return (
    <header className="mb-10 md:mb-5 grid justify-between gap-4.8 grid-cols-[auto_auto] text-1.8rem">
      <progress
        max={numQuestions}
        value={state.index + Number(state.answer !== null)}
        className="w-full h-3 col-span-full border border-primary rounded-lg mb-5"
      />

      <p className="md:text-lg">
        Question <strong>{state.index + 1}</strong> / {numQuestions}
      </p>

      <p className="md:text-lg">
        <strong>{state.points}</strong> / {maxPossiblePoints}
      </p>
    </header>
  );
};

export default Progress;
