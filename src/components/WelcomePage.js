import React from "react";

import Button from "../UI/Button";
import classes from "./WelcomePage.module.css";

const WelcomePage = ({ dispatch, numOfQuestions }) => {
  return (
    <div>
      <h2>
        If you are ready click the button and answer {numOfQuestions} questions
      </h2>
      <Button
        className={classes["start-btn"]}
        onClick={() => {
          dispatch({ type: "START_QUIZ" });
        }}
      >
        Let's start
      </Button>
    </div>
  );
};

export default WelcomePage;
