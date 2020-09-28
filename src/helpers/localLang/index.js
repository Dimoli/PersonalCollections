import vocabularies from "./vocabularies";

const local = navigator.language;
const mapVocabulary = { ["ru-RU"]: "Russian", ["en-US"]: "English" };
const lang = mapVocabulary[local];
const vocabulary = vocabularies[lang];

export default {
  local,
  lang,
  languages: Object.values(mapVocabulary),
  vocabulary,
  vocabularies,
};
