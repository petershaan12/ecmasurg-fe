import { useQuiz } from "@/utils/QuizContext";

const Options = ({ question }: any) => {
  const { dispatch, state } = useQuiz();

  const hasAnswered = state.answer !== null;

  return (
    <div className="flex flex-col  gap-5 mt-5 w-96">
      {question.options.map((option: string, index: string) => (
        <button
          className={`btn btn-option cursor-pointer py-3 w-full font-semibold rounded-md hover:bg-primary hover:text-white px-5   ${
            index === state.answer ? "answer" : ""
          } ${
            hasAnswered
              ? index === question.correct_option
                ? "correct"
                : "wrong"
              : ""
          }`}
          key={option}
          disabled={hasAnswered}
          onClick={() => dispatch({ type: "newAnswer", payload: index })}
        >
          {option}
        </button>
      ))}
    </div>
  );
};

export default Options;
