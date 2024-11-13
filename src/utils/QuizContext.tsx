import axios from "axios";
import {
  createContext,
  useContext,
  useReducer,
  useEffect,
  ReactNode,
  Dispatch,
} from "react";
import { useParams } from "react-router-dom";

interface Question {
  id: number;
  correct_option: string;
  points: number;
  pembahasan: string;
}

interface State {
  questions: Question[];
  gameStatus: string;
  index: number;
  answer: string | null;
  points: number;
  highscore: number;
  secondsRemaining: number | null;
  canStartQuiz: boolean;
}

type Action =
  | { type: "dataReceived"; payload: Question[] }
  | { type: "dataFailed" }
  | { type: "start" }
  | { type: "newAnswer"; payload: string }
  | { type: "nextQuestion" }
  | { type: "finish" }
  | { type: "restart" }
  | { type: "tick" }
  | { type: "submit" }
  | { type: "checkQuizStatus"; payload: boolean };

const initialState: State = {
  questions: [],
  gameStatus: "loading",
  index: 0,
  answer: null,
  points: 0,
  highscore: 0,
  secondsRemaining: null,
  canStartQuiz: false,
};

const GameContext = createContext<
  | {
      state: State;
      numQuestions: number;
      maxPossiblePoints: number;
      dispatch: Dispatch<Action>;
    }
  | undefined
>(undefined);

const SECS_PER_QUESTION = 30;

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "dataReceived":
      return {
        ...state,
        questions: action.payload,
        gameStatus: "ready",
      };
    case "dataFailed":
      return {
        ...state,
        gameStatus: "error",
      };
    case "start":
      return {
        ...state,
        gameStatus: "active",
        secondsRemaining: state.questions.length * SECS_PER_QUESTION,
      };
    case "newAnswer":
      const question = state.questions[state.index];
      return {
        ...state,
        answer: action.payload,
        points:
          question && action.payload === question.correct_option
            ? state.points + question.points
            : state.points,
      };
    case "nextQuestion":
      return { ...state, index: state.index + 1, answer: null };
    case "finish":
      return {
        ...state,
        gameStatus: "finished",
        highscore:
          state.points > state.highscore ? state.points : state.highscore,
      };
    case "restart":
      return {
        ...initialState,
        questions: state.questions,
        gameStatus: "ready",
        highscore: state.highscore,
      };
    case "submit":
      return {
        ...state,
        gameStatus: "submit",
      };
    case "tick":
      return {
        ...state,
        secondsRemaining: (state.secondsRemaining || 1) - 1,
        gameStatus:
          state.secondsRemaining === 1 ? "finished" : state.gameStatus,
      };
    case "checkQuizStatus":
      return {
        ...state,
        canStartQuiz: action.payload,
      };
    default:
      throw new Error("Unknown action type");
  }
}

function QuizProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const numQuestions = state.questions.length;
  const maxPossiblePoints = state.questions.reduce(
    (prev, cur) => prev + Number(cur.points),
    0
  );

  const { category } = useParams();

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const res = await axios.get(
          `${process.env.REACT_PUBLIC_API_KEY}/api/quiz/${category}`,
          {
            params: {
              category: category,
            },
            headers: {
              Accept: "application/json",
              Authorization: `Bearer ${sessionStorage.getItem("token")}`,
            },
          }
        );

        // Konversi `points` menjadi number untuk setiap item dalam questions
        const questionsWithNumbers = res.data.questions.map(
          (question: any) => ({
            ...question,
            correct_option: Number(question.correct_option),
            points: Number(question.points), // Pastikan points dalam bentuk number
          })
        );

        dispatch({ type: "dataReceived", payload: questionsWithNumbers });
      } catch (error) {
        dispatch({ type: "dataFailed" });
      }
    };

    const checkQuizStatus = async () => {
      try {
        const res = await axios.get(
          `${process.env.REACT_PUBLIC_API_KEY}/api/check-status-quiz`,
          {
            headers: {
              Accept: "application/json",
              Authorization: `Bearer ${sessionStorage.getItem("token")}`,
            },
          }
        );
        if (res.data.canStart) {
          dispatch({ type: "checkQuizStatus", payload: true });
        } else {
          dispatch({ type: "checkQuizStatus", payload: false });
        }
      } catch (error) {
        console.error("Error checking quiz status:", error);
      }
    };

    checkQuizStatus();
    fetchQuestions();
  }, []);

  return (
    <GameContext.Provider
      value={{ state, numQuestions, maxPossiblePoints, dispatch }}
    >
      {children}
    </GameContext.Provider>
  );
}

function useQuiz() {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error("useQuiz must be used within a QuizProvider");
  }
  return context;
}

export { QuizProvider, useQuiz };
