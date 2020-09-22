import React from "react";
import { NavLink } from "react-router-dom";

import defaultCollection from "../../assets/defaultCollection.png";

export default (props) => {
  return (
    <>
      {props.mainData.lastAddedItems?.map((item, index) => (
        <div key={index} className="text-center m-5">
          <NavLink to={`/collections/${item.collectionId}/items/${item._id}`}>
            <div className="d-flex w-75 justify-content-center">
              <img
                src={item.image || defaultCollection}
                width="25%"
                alt="Imaginate collection"
              />
              <p>{item._id}</p>
            </div>
          </NavLink>
        </div>
      ))}
    </>
  );
};
