import React from "react";
import { NavLink } from "react-router-dom";
import { Col } from "react-bootstrap";
import ContentEditable from "react-contenteditable";

import useHttp from "../../../hooks/useHttp";
import defaultCollectionImage from "../../../assets/defaultCollection.png";

export default (props) => {
  const { collections, updateCollections } = props;
  const { request } = useHttp();

  const removeCollection = async (event) => {
    await request(
      `/collections/delete/${collections[event.target.id]._id}`,
      "DELETE"
    );

    updateCollections();
  };

  const updateDescription = async (event) => {
    await request(
      `/collections/update/${collections[event.target.id]._id}`,
      "PATCH",
      {
        description: event.target.textContent,
      }
    );

    updateCollections();
  };

  return (
    <Col className="collections col-11">
      {collections.map((collection, index) => (
        <div key={index} className="d-flex">
          <NavLink
            to={`/collections/${collection._id}`}
            className="w-100 h-100"
            onClick={(e) =>
              e.target.accessKey === "description" && e.preventDefault()
            }
          >
            <div className="collection w-100 h-100">
              <img
                src={collection.image || defaultCollectionImage}
                className="collection-image w-100 h-100 border border-warning"
                alt="Imaginate collection"
              />
              <div className="collection-info w-100 h-100 text-center text-warning">
                <p className="m-0 mb-sm-2 mb-md-3 mb-lg-4 mb-xl-5 overflow-hidden">
                  {collection.name}
                </p>
                <p className="m-0 mb-sm-2 mb-md-3 mb-lg-4 mb-xl-5 overflow-hidden">
                  {collection.theme}
                </p>
                <ContentEditable
                  id={index}
                  accessKey="description"
                  html={collection.description}
                  onBlur={updateDescription}
                  tagName="p"
                  className="h-50 overflow-auto px-3"
                />
              </div>
            </div>
          </NavLink>
          <div className="d-flex flex-column pl-2">
            <i
              className="fa fa-times text-primary mb-1"
              id={index}
              onClick={removeCollection}
              aria-hidden="true"
            />
          </div>
        </div>
      ))}
    </Col>
  );
};
