import React, { useState, useContext } from "react";
import { NavLink } from "react-router-dom";

import useHttp from "../../hooks/useHttp";
import authContext from "../../helpers/context/auth";

export default () => {
  const [foundItems, setFoundItems] = useState([]);
  const { request, loading, error } = useHttp();
  const { localLang } = useContext(authContext);

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
    <div
      className="nav-bar__search col-4 p-1"
      data-placement="top"
      title="Search items"
    >
      <i
        className="fa fa-search position-absolute pt-2 pl-2 text-info"
        aria-hidden="true"
      />
      <input
        type="text"
        className="form-control pl-4"
        placeholder={localLang.vocabulary.navBar?.search}
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
              <div className="d-flex w-100 justify-content-between">
                <p className="mb-1">
                  <strong>Name: </strong>
                  {item.name}
                  <strong> Tag: </strong>
                  {item.tag}
                </p>
                <small>{item.date}</small>
              </div>
              <p className="mb-1 overflow-hidden">
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
