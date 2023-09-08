import React from "react";

import classes from "./MainWrapper.module.css";

const MainWrapper = ({ children }) => {
  return <main className={classes.wrapper}>{children}</main>;
};

export default MainWrapper;
