import React from "react";

import classes from "./ProgressBar.module.css";

const ProgressBar = ({ index, totalQuestions, totalPoints }) => {
  return (
    <div>
      <progress max={100} value={80} className={classes.progress} />
      <p>
        {index + 1}/{totalQuestions} questions
      </p>
      <p>{totalPoints} points</p>
    </div>
  );
};

export default ProgressBar;
