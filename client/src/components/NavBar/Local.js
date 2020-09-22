import React, { useContext } from "react";
import { Dropdown } from "react-bootstrap";

import authContext from "../../context/auth";

export default () => {
  const { localLang, changeLocalLang } = useContext(authContext);

  return (
    <Dropdown className="m-auto">
      <Dropdown.Toggle as={LocalisationIcon} />
      <Dropdown.Menu className="mt-1">
        {localLang.languages.map((language, index) => (
          <Dropdown.Item
            key={index}
            id={language}
            onClick={changeLocalLang}
            active={localLang.lang === language}
          >
            {language}
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
};

const LocalisationIcon = React.forwardRef(({ onClick }, ref) => (
  <a ref={ref} onClick={onClick}>
    <i className="fa fa-globe text-white pl-2 pr-4" aria-hidden="true" />
  </a>
));
