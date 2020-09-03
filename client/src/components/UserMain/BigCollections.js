import React from "react";
import { NavLink } from "react-router-dom";

import image1 from "../../assets/1.png";
import image2 from "../../assets/2.png";
import image3 from "../../assets/3.png";

const bigCollection = [image1];
const bigCollections = [image1, image3, image2, image1, image2, image3, image1];

export default () => {
  return (
    <>
      {bigCollections.map((image, index) => (
        <div key={index} className="text-center m-5">
          <NavLink to={`/personal-collection/${index + 1}`}>
            <img src={image} width="75%" alt="Imaginate collection" />
          </NavLink>
        </div>
      ))}
    </>
  );
};
