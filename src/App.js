import React, { useReducer, useEffect } from "react";
import MainWrapper from "./UI/MainWrapper";
import Header from "./components/Header";
import WelcomePage from "./components/WelcomePage";
import ProgressBar from "./components/ProgressBar";
import Questions from "./components/Questions";
import FinishScreen from "./components/FinishScreen";

const initialState = {
  questions: [],
  status: "loading",
  error: false,
  index: 0,
  answer: false,
  totalPoints: 0,
};

const reducer = (state, action) => {
  if (action.type === "DATA_LOADED") {
    return { ...state, status: "dataLoaded", questions: action.payload };
  }

  if (action.type === "START_QUIZ") {
    return { ...state, status: "start" };
  }

  if (action.type === "NEXT_QUESTION") {
    return {
      ...state,
      status: state.questions.length - 1 === state.index ? "end" : state.status,
      index: state.index + 1,
      answer: false,
    };
  }

  if (action.type === "ANSWER") {
    const answerPoints =
      state.questions[state.index].correctOption === action.payload
        ? state.questions[state.index].points
        : 0;

    return {
      ...state,
      answer: true,
      totalPoints: state.totalPoints + answerPoints,
    };
  }

  if (action.type === "RESET_QUIZ") {
    return {
      ...state,
      status: "dataLoaded",
      error: false,
      index: 0,
      answer: false,
      totalPoints: 0,
    };
  }

  if (action.type === "ERROR") {
    return { ...state, status: "error", error: action.payload };
  }

  return state;
};

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { questions, status, error, index, answer, totalPoints } = state;

  const numOfQuestions = questions.length;
  const maxPoints = questions.reduce((start, curr) => start + curr.points, 0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:9000/questions`);

        if (!response.ok) throw new Error("Something went wrong");
        const data = await response.json();

        dispatch({ type: "DATA_LOADED", payload: data });
      } catch (error) {
        dispatch({ type: "ERROR", payload: error.message });
      }
    };

    fetchData();
  }, [dispatch]);

  return (
    <MainWrapper>
      <Header />
      {status === "error" && <p>{error}</p>}
      {status === "dataLoaded" && (
        <WelcomePage dispatch={dispatch} numOfQuestions={numOfQuestions} />
      )}

      {status === "start" && (
        <>
          <ProgressBar
            index={index}
            totalQuestions={numOfQuestions}
            totalPoints={totalPoints}
            maxPoints={maxPoints}
          />
          <Questions
            questions={questions}
            index={index}
            dispatch={dispatch}
            answer={answer}
            totalQuestions={numOfQuestions}
          />
        </>
      )}
      {status === "end" && (
        <FinishScreen
          dispatch={dispatch}
          totalPoints={totalPoints}
          maxPoints={maxPoints}
        />
      )}
    </MainWrapper>
  );
};

export default App;
