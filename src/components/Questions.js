import React from "react";

import Button from "../UI/Button";
import classes from "./Questions.module.css";

const Questions = ({ dispatch, questions, index, answer }) => {
  const correctOption = questions[index].correctOption;

  return (
    <div>
      <p>{questions[index].question}</p>
      <div className={classes.answers}>
        {questions[index].options.map((option, i) => (
          <Button
            className={
              !answer
                ? classes.btn
                : i === correctOption
                ? classes["btn-correct"]
                : classes["btn-standard"]
            }
            key={option}
            onClick={() => {
              console.log(i);
              dispatch({ type: "ANSWER", payload: i });
            }}
          >
            {option}
          </Button>
        ))}
      </div>
      {answer && (
        <Button
          onClick={() => {
            dispatch({ type: "NEXT_QUESTION" });
          }}
        >
          next
        </Button>
      )}
    </div>
  );
};

export default Questions;
