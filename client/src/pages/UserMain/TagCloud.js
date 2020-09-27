import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import TagCloud from "react-tag-cloud";

export default (props) => {
  const [updateCheckbox, setUpdateCheckbox] = useState(false);

  return (
    <div className="d-flex mt-5">
      <div>
        <TagCloud
          style={{
            fontFamily: "sans-serif",
            fontSize: 20,
            width: "15vw",
            height: "25vh",
          }}
        >
          {props.items?.map((item, index) => (
            <NavLink
              key={index}
              to={`/collections/${item.collectionId}/items/${item._id}`}
            >
              {item.name}
            </NavLink>
          ))}
        </TagCloud>
      </div>
      <div className="d-flex h-25">
        <input
          type="checkbox"
          id="tag-cloud"
          onClick={() => setUpdateCheckbox(!updateCheckbox)}
        />
        <label htmlFor="tag-cloud" className="ml-2">
          Updating tag-cloud
        </label>
      </div>
    </div>
  );
};
