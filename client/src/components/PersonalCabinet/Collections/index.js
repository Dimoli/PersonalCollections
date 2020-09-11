import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { Col } from "react-bootstrap";

import useHttp from "../../../hooks/useHttp";
import authContext from "../../../context/auth";
import defaultCollectionImage from "../../../assets/defaultCollection.png";

export default (props) => {
  const { collections, setCollections, updateCollections } = props;
  const { request, loading, error } = useHttp();
  const { userId } = useContext(authContext);

  const removeCollection = async (event) => {
    await request(`/collections/delete/${event.target.id}`, "POST", {
      userId,
    });

    updateCollections();
  };

  return (
    <Col className="collections" xs={11}>
      {collections &&
        collections.map((collection, index) => (
          <div key={index} className="d-flex">
            <NavLink to={`/collection/${index + 1}`}>
              <img
                src={collection.image || defaultCollectionImage}
                width="100%"
                alt="Imaginate collection"
              />
            </NavLink>
            <div className="pl-2">
              <i
                className="fa fa-times text-primary"
                id={index}
                onClick={removeCollection}
                aria-hidden="true"
              />
              <NavLink to={`/collection/${index}`}>
                <i className="fa fa-pencil-square-o" aria-hidden="true" />
              </NavLink>
            </div>
          </div>
        ))}
    </Col>
  );
};
