import { useState } from "react";

import initialLocalLang from "../helpers/localLang/";

export default () => {
  const [localLang, setLocalLang] = useState(initialLocalLang);

  const changeLocalLang = (event) => {
    const lang = event.target.id;
    const local = lang === "Russian" ? "ru-RU" : "en-US";
    const vocabulary = localLang.vocabularies[lang];

    setLocalLang({
      ...localLang,
      lang,
      local,
      vocabulary,
    });
  };

  return { localLang, changeLocalLang };
};
