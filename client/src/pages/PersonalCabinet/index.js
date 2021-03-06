import React, { useState, useEffect, useContext } from "react";
import { Col } from "react-bootstrap";
import Skeleton from "react-loading-skeleton";

import Collections from "./Collections/";
import CreateCollection from "./CreateCollection/";
import useHttp from "../../hooks/useHttp";
import authContext from "../../helpers/context/auth";

export default (props) => {
  const { request } = useHttp();
  const { userId } = useContext(authContext);
  const [collections, setCollections] = useState([]);
  const childrenProps = { collections, setCollections };

  const updateCollections = () => {
    const getCollections = async () => {
      const receivedCollections = await request("/collections/get", "POST", {
        userId: props.match.params.iduser || userId,
      });

      if (!receivedCollections.length) {
        setCollections([false]);

        return;
      }

      setCollections(receivedCollections);
    };

    getCollections();
  };

  useEffect(updateCollections, [setCollections, request, userId]);

  return (
    <div className="d-flex p-5">
      {collections[0] !== false &&
        (collections.length ? (
          <Collections
            {...childrenProps}
            updateCollections={updateCollections}
          />
        ) : (
          <Col className="collections col-11">
            {Array(2)
              .fill("")
              .map((el, index) => (
                <Skeleton key={index} width={75} count={24} />
              ))}
          </Col>
        ))}
      <CreateCollection {...childrenProps} />
    </div>
  );
};
