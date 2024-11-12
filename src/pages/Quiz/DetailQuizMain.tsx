import Error from "@/components/Quiz/Error";
import FinishScreen from "@/components/Quiz/FinishScreen";
import NextButton from "@/components/Quiz/NextButton";
import Progress from "@/components/Quiz/Progress";
import Question from "@/components/Quiz/Question";
import StartScreen from "@/components/Quiz/StartScreen";
import Timer from "@/components/Quiz/Timer";
import Loading from "@/components/Loading";
import { useQuiz } from "@/utils/QuizContext";
import Pembahasan from "@/components/Quiz/Pembahasan";

const DetailQuizMain = () => {
  const { state } = useQuiz();

  return (
    <>
      {state.gameStatus === "loading" && <Loading />}
      {state.gameStatus === "error" && <Error />}
      {state.gameStatus === "ready" && <StartScreen />}
      {state.gameStatus === "active" && (
        <>
          <Progress />
          <Question />
          <div className="flex items-center justify-between mt-12">
            <Timer />
            <NextButton />
          </div>
          <footer>
            <Pembahasan />
          </footer>
        </>
      )}
      {state.gameStatus === "finished" && <FinishScreen />}
    </>
  );
};

export default DetailQuizMain;
