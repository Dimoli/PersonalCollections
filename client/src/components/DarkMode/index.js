import React from "react";
import useDarkMode from "use-dark-mode";

import Toggle from "./Toggle";

export default () => {
  const darkMode = useDarkMode(false);

  return <Toggle checked={darkMode.value} onChange={darkMode.toggle} />;
};
