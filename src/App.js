import React, { useReducer, useEffect } from "react";
import MainWrapper from "./UI/MainWrapper";
import Header from "./components/Header";
import WelcomePage from "./components/WelcomePage";
import ProgressBar from "./components/ProgressBar";
import Questions from "./components/Questions";

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
    return { ...state, index: state.index++, answer: false };
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

  if (action.type === "ERROR") {
    return { ...state, status: "error", error: action.payload };
  }

  return state;
};

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { questions, status, error, index, answer, totalPoints } = state;

  const numOfQuestions = questions.length;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:9000/questions`);

        if (!response.ok) throw new Error("Something went wrong");
        const data = await response.json();
        console.log(data);
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
          />
          <Questions
            questions={questions}
            index={index}
            dispatch={dispatch}
            answer={answer}
          />
        </>
      )}
    </MainWrapper>
  );
};

export default App;
