import React from "react";

import Button from "../UI/Button";
import classes from "./FinishScren.module.css";

const FinishScreen = ({ dispatch, totalPoints, maxPoints }) => {
  const percentageResult = ((totalPoints / maxPoints) * 100).toFixed(0);

  let emoji;
  if (percentageResult < 20) emoji = "🤦‍♂️";
  if (percentageResult > 20 && percentageResult < 50) emoji = "🤔";
  if (percentageResult > 50 && percentageResult < 80) emoji = "😀";
  if (percentageResult > 80) emoji = "🏆";

  return (
    <>
      <div className={classes["finish-wrapper"]}>
        <h3>
          {emoji} You finished the quiz. You have {totalPoints} from {maxPoints}
          . Your success rate is {percentageResult} %
        </h3>
      </div>
      <Button
        onClick={() => {
          dispatch({ type: "RESET_QUIZ" });
        }}
      >
        Reset quiz
      </Button>
    </>
  );
};

export default FinishScreen;
