import React, { useState } from "react";
import { NavLink } from "react-router-dom";

import useHttp from "../../hooks/useHttp";

export default () => {
  const [foundItems, setFoundItems] = useState([]);
  const { request, loading, error } = useHttp();

  const findItems = async (event) => {
    if (event.key === "Enter" || event.keyCode === 13) {
      setFoundItems(
        await request("/full-text-search", "POST", {
          searchedData: event.target.value,
        })
      );
    }
  };

  return (
    <div className="nav-bar__search col-5">
      <input
        type="text"
        className="form-control"
        placeholder="Search items"
        onKeyUp={findItems}
        // disabled={loading}
      />
      <ul className={"d-none list-group position-absolute w-100 pr-4"}>
        {foundItems.length ? (
          foundItems.map((item, index) => (
            <NavLink
              key={index}
              to={`/collections/${item.collectionId}/items/${item._id}`}
              className="list-group-item list-group-item-action"
            >
              <p className="mb-1">
                <strong>Name: </strong>
                {item.name}
                <strong> Tag: </strong>
                {item.tag}
              </p>
              <p className="mb-1">
                <strong>Link: </strong>
                {`/collections/${item.collectionId}/items/${item._id}`}
              </p>
            </NavLink>
          ))
        ) : (
          <p className="list-group-item list-group-item-action">
            <strong>No found items</strong>
          </p>
        )}
      </ul>
    </div>
  );
};
