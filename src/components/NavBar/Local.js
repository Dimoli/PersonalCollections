import React, { useContext } from "react";
import { Dropdown } from "react-bootstrap";

import authContext from "../../helpers/context/auth";

export default () => {
  const { localLang, changeLocalLang } = useContext(authContext);

  return (
    <Dropdown className="m-auto mr-0 mr-sm-3">
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
  <div ref={ref} onClick={onClick}>
    <i
      className="fa fa-globe text-white px-1 px-sm-4"
      data-placement="top"
      title="Localisation"
      aria-hidden="true"
    />
  </div>
));
