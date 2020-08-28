import React from "react";
import DarkModeToggle from "react-dark-mode-toggle";

export default (props) => (
  <DarkModeToggle onChange={props.onChange} checked={props.checked} size={80} />
);
