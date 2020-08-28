import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { Col } from "react-bootstrap";

import image1 from "../../assets/1.png";
import image2 from "../../assets/2.png";
import image3 from "../../assets/3.png";

const image = [image1];
const images = [image1, image3, image2, image1, image2, image3, image1];

export default () => {
  const [collections, setCollections] = useState(image);

  const removeCollection = (event) => {
    setCollections(collections.filter((coll, id) => id != event.target.id));
  };

  return (
    <Col className="collections" xs={11}>
      {collections.map((image, index) => (
        <div key={index} className="d-flex">
          <NavLink to={`/personal-collection/${index + 1}`}>
            <img src={image} width="100%" alt="Imaginate collection" />
          </NavLink>
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
    </Col>
  );
};
