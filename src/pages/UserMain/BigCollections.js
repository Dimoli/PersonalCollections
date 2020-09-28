import React from "react";
import { NavLink } from "react-router-dom";

import defaultCollection from "../../assets/defaultCollection.png";

export default (props) => {
  return (
    <>
      {props.bigCollections?.map((collection, index) => (
        <div key={index} className="text-center m-5">
          <NavLink to={`/collections/${collection._id}`}>
            <img
              src={collection.image || defaultCollection}
              className="border border-warning"
              width="75%"
              alt="Imaginate collection"
            />
          </NavLink>
        </div>
      ))}
    </>
  );
};
