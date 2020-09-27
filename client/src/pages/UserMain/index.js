import React, { useState, useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import Skeleton from "react-loading-skeleton";

import BigCollections from "./BigCollections";
import RecentItems from "./RecentItems";
import TagCloud from "./TagCloud";

import useHttp from "../../hooks/useHttp";

export default () => {
  const { request } = useHttp();
  const [mainData, setMainData] = useState({});

  useEffect(() => {
    const getMainData = async () => {
      setMainData(await request(`/user-main`, "POST"));
    };

    getMainData();
  }, [request]);

  return (
    <Row>
      <Col sm={6} md={4}>
        {Object.keys(mainData).length ? (
          <BigCollections bigCollections={mainData.bigCollections} />
        ) : (
          Array(2)
            .fill("")
            .map((el, index) => (
              <div key={index} className="text-center m-5">
                <Skeleton className="w-75" count={10} />
              </div>
            ))
        )}
      </Col>
      <Col sm={6} md={4}>
        {Object.keys(mainData).length ? (
          <RecentItems lastItems={mainData.lastAddedItems} />
        ) : (
          Array(3)
            .fill("")
            .map((el, index) => (
              <div key={index} className="text-center m-5">
                <Row>
                  <Col xs={3}>
                    <Skeleton count={3} />
                  </Col>
                  <Col xs={9}>
                    <Skeleton count={1} />
                  </Col>
                </Row>
              </div>
            ))
        )}
      </Col>
      <Col sm={12} md={4}>
        <TagCloud items={mainData.lastAddedItems} />
      </Col>
    </Row>
  );
};
