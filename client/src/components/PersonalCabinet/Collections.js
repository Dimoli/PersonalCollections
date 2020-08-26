import React, { useState } from "react";
import { NavLink } from "react-router-dom";

import image1 from "../../assets/1.png";
import image2 from "../../assets/2.png";
import image3 from "../../assets/3.png";

const images = [image1];

const Collections = () => {
  const [collections, setCollections] = useState(images);

  const removeCollection = (event) => {
    setCollections(collections.filter((coll, id) => id != event.target.id));
  };

  return (
    <div className="collections col-11">
      {collections.map((image, index) => (
        <div key={index} className="d-flex">
          <img
            width="100%"
            height="200px"
            src={image}
            alt="Imaginate collections"
          />
          <div className="pl-2">
            <i
              className="fa fa-times text-primary"
              id={index}
              onClick={removeCollection}
              aria-hidden="true"
            />
            <NavLink to={`/personal-collection/${index}`}>
              <i className="fa fa-pencil-square-o" aria-hidden="true" />
            </NavLink>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Collections;
