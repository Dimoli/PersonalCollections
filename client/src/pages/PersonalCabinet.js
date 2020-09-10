import React, { useState, useEffect, useContext } from "react";

import Collections from "../components/PersonalCabinet/Collections/";
import CreateCollection from "../components/PersonalCabinet/CreateCollection/";
import useHttp from "../hooks/useHttp";
import authContext from "../context/auth";

export default () => {
  const { request, loading, error } = useHttp();
  const { userId } = useContext(authContext);
  const [collections, setCollections] = useState([]);
  const childrenProps = { collections, setCollections };

  useEffect(() => {
    const getCollections = async () => {
      setCollections(
        await request("/collections/get", "POST", {
          userId,
        })
      );
    };

    if (userId) getCollections();
  }, [setCollections, request, userId]);

  return (
    <div className="d-flex p-5">
      <Collections {...childrenProps} />
      <CreateCollection {...childrenProps} />
    </div>
  );
};
