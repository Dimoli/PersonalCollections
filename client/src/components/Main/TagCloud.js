import React, { useState } from "react";
import TagCloud from "react-tag-cloud";

export default () => {
  const [updateCheckbox, setUpdateCheckbox] = useState(false);

  return (
    <div className="d-flex mt-5">
      <div>
        <TagCloud
          style={{
            fontFamily: "sans-serif",
            fontSize: 30,
            color: "black",
            width: "200px",
            height: "300px",
          }}
        >
          <div
            style={{
              fontFamily: "serif",
              fontSize: 40,
              fontStyle: "italic",
              fontWeight: "bold",
              color: "black",
            }}
          >
            Futurama
          </div>
          <div>Gobots</div>
          <div>Thundercats</div>
          <div>M.A.S.K.</div>
          <div>GI Joe</div>
          <div>Inspector Gadget</div>
          <div>Bugs Bunny</div>
          <div>Tom & Jerry</div>
          <div>Cowboy Bebop</div>
          <div>Evangelion</div>
          <div>Bleach</div>
          <div>GITS</div>
          <div>Pokemon</div>
          <div>She Ra</div>
          <div>Fullmetal Alchemist</div>
          <div>Gundam</div>
          <div>Uni Taisen</div>
          <div>Pinky and the Brain</div>
          <div>Bobs Burgers</div>
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
