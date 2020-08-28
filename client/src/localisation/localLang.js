import languageVocabulary from "./languageVocabulary";

const local = navigator.language;
let lang =
  local === "ru-RU" ? languageVocabulary.Russian : languageVocabulary.English;

export default { local, lang };
