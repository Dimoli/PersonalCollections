import React, { useState, useEffect, useContext } from "react";
import { Row, Col } from "react-bootstrap";
import Skeleton from "react-loading-skeleton";

import Collections from "./Collections/";
import CreateCollection from "./CreateCollection/";
import useHttp from "../../hooks/useHttp";
import authContext from "../../helpers/context/auth";

export default () => {
  const { request, loading, error } = useHttp();
  const { userId } = useContext(authContext);
  const [collections, setCollections] = useState([]);
  const childrenProps = { collections, setCollections };

  const updateCollections = () => {
    const getCollections = async () => {
      setCollections(
        await request("/collections/get", "POST", {
          userId,
        })
      );
    };

    if (userId) getCollections();
  };

  useEffect(updateCollections, [setCollections, request, userId]);

  return (
    <div className="d-flex p-5">
      {collections.length ? (
        <Collections {...childrenProps} updateCollections={updateCollections} />
      ) : (
        <Col className="collections col-11">
          {Array(2)
            .fill("")
            .map((el, index) => (
              <Skeleton key={index} width={75} count={24} />
            ))}
        </Col>
      )}
      <CreateCollection {...childrenProps} />
    </div>
  );
};
