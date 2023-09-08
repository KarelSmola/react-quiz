import React from "react";

import classes from "./Button.module.css";

const Button = ({ children, className, onClick }) => {
  return (
    <button className={`${className} ${classes.btn}`} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
