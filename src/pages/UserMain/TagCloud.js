import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import TagCloud from "react-tag-cloud";

export default (props) => {
  const [updateCheckbox, setUpdateCheckbox] = useState(false);

  const generateColor = () => Math.floor(Math.random() * 255);

  return (
    <div className="d-flex justify-content-center align-items-center mt-5">
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
              style={{
                color: `rgb(${generateColor()}, ${generateColor()}, ${generateColor()})`,
              }}
              to={`/collections/${item.collectionId}/items/${item._id}`}
            >
              {item.name}
            </NavLink>
          ))}
        </TagCloud>
      </div>
      <button
        className="btn h-25 btn-success mr-4"
        onClick={() => setUpdateCheckbox(!updateCheckbox)}
      >
        Update tag-cloud
      </button>
    </div>
  );
};
