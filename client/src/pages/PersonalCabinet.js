import React from "react";

import Collections from "../components/PersonalCabinet/Collections";
import CreateCollection from "../components/PersonalCabinet/CreateCollection/";

export default () => (
  <div className="d-flex p-5">
    <Collections />
    <CreateCollection />
  </div>
);
