import React, { useState, useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import Skeleton from "react-loading-skeleton";

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
      <Col>
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
      <Col>
        <TagCloud items={mainData.lastAddedItems} />
      </Col>
    </Row>
  );
};
