import React from "react";
import ReactDOM from "react-dom";
import { IntlProvider } from "react-intl";

import "./index.css";

import App from "./App";
import localLang from "./localisation/localLang";
import * as serviceWorker from "./serviceWorker";

ReactDOM.render(
  <React.StrictMode>
    <IntlProvider locale={localLang.local} message={localLang.lang}>
      <App />
    </IntlProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

serviceWorker.unregister();
