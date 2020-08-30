import React from "react";
import { NavLink } from "react-router-dom";

import image1 from "../../assets/1.png";
import image2 from "../../assets/2.png";
import image3 from "../../assets/3.png";

const recentItem = [image1];
const recentItems = [image1, image3, image2, image1, image2, image3, image1];

export default () => {
  return (
    <>
      {recentItems.map((image, index) => (
        <div key={index} className="text-center m-5">
          <div className="d-flex w-75 justify-content-center">
            <img src={image} width="25%" alt="Imaginate collection" />
            <p>{image}</p>
          </div>
        </div>
      ))}
    </>
  );
};
