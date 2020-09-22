import React, { useState, useEffect } from "react";
import { Row, Col } from "react-bootstrap";

import BigCollections from "../components/UserMain/BigCollections";
import RecentItems from "../components/UserMain/RecentItems";
import TagCloud from "../components/UserMain/TagCloud";

import useHttp from "../hooks/useHttp";

export default () => {
  const { request, loading, error } = useHttp();
  const [mainData, setMainData] = useState({});

  useEffect(() => {
    const getMainData = async () => {
      setMainData(await request(`/user-main`, "POST"));
    };

    getMainData();
  }, []);

  return (
    <Row>
      <Col>
        <BigCollections mainData={mainData} />
      </Col>
      <Col>
        <RecentItems mainData={mainData} />
      </Col>
      <Col>
        <TagCloud />
      </Col>
    </Row>
  );
};
