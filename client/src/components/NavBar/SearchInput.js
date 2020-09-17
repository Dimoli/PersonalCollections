import React from "react";

import useHttp from "../../hooks/useHttp";

export default () => {
  const { request, loading, error } = useHttp();

  const handleInputChange = async (event) => {
    console.log("handleInputChange -> event", event.target.value);
    const data = await request("/full-text-search", "POST", {
      searchedData: event.target.value,
    });
    console.log("handleInputChange -> foundItems", data.foundItems);
  };

  return (
    <input
      type="text"
      className="form-control col-5"
      placeholder="Search items"
      onChange={handleInputChange}
    />
  );
};
