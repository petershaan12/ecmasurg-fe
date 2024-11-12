import { useQuiz } from "@/utils/QuizContext";
import { Button } from "../ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { fetchUsers } from "@/redux/fetchUser";
import { useDispatch } from "react-redux";

const FinishScreen = () => {
  const userDispatch = useDispatch();
  const navigate = useNavigate();
  const { state, maxPossiblePoints, dispatch } = useQuiz();

  const percentage = (state.points / maxPossiblePoints) * 100;

  let emoji;
  if (percentage === 100) emoji = "🥇";
  if (percentage >= 80 && percentage < 100) emoji = "🎉";
  if (percentage >= 50 && percentage < 80) emoji = "🙃";
  if (percentage >= 0 && percentage < 50) emoji = "🤨";
  if (percentage === 0) emoji = "🤦‍♂️";

  const submitPoint = async (points: number) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_PUBLIC_API_KEY}/api/quiz/update-points`,
        { points },
        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        }
      );

      // Menangani response jika diperlukan
      if (response.status === 200) {
        dispatch({ type: "submit" });
        userDispatch(fetchUsers() as any);
      } else {
        console.error("Failed to update points");
      }
    } catch (error) {
      console.error("Error submitting points:", error);
    }
  };

  return (
    <div className="flex items-center justify-center flex-col mt-64">
      <p className="bg-primary text-white rounded-full text-center text-base px-7 py-3 w-fit mx-auto mb-6">
        <span>{emoji}</span> You scored <strong>{state.points}</strong> out of{" "}
        {maxPossiblePoints} ({Math.ceil(percentage)}%)
      </p>
      <p className="text-center">(Highscore: {state.highscore} points)</p>
      <div className="flex items-center justify-center gap-x-8 mt-8">
        <button
          onClick={() => {
            navigate(-1);
          }}
          className="flex items-center hover:underline rounded-full"
        >
          <ArrowLeft /> Back to Games
        </button>
        <Button
          className="text-white text-center"
          onClick={() => submitPoint(state.points)}
        >
          Submit
        </Button>
      </div>
    </div>
  );
};

export default FinishScreen;