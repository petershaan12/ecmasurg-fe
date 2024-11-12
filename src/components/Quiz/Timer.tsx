import { useQuiz } from "@/utils/QuizContext";
import { useEffect } from "react";

const Timer = () => {
  const { dispatch, state } = useQuiz();

  const secondsRemaining = state.secondsRemaining ?? 0;
  const mins = Math.floor(secondsRemaining / 60);
  const seconds = secondsRemaining % 60;

  useEffect(
    function () {
      const id = setInterval(function () {
        dispatch({ type: "tick" });
      }, 1000);

      return () => clearInterval(id);
    },
    [dispatch]
  );

  return (
    <div className="flex items-center space-x-3">
      <p>Time Left</p>
      <div className="bg-primary text-xl font-bold text-white rounded-full px-5 py-1">
        {mins < 10 && "0"}
        {mins}:{seconds < 10 && "0"}
        {seconds}
      </div>
    </div>
  );
};

export default Timer;
