import React from "react";

import classes from "./ProgressBar.module.css";

const ProgressBar = ({ index, totalQuestions, totalPoints, maxPoints }) => {
  return (
    <div>
      <progress
        max={totalQuestions}
        value={index}
        className={classes.progress}
      />
      <p>
        {index + 1}/{totalQuestions} questions
      </p>
      <p>
        {totalPoints} / {maxPoints} points
      </p>
    </div>
  );
};

export default ProgressBar;
