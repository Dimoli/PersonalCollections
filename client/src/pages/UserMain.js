import React from "react";
import { Row, Col } from "react-bootstrap";

import BigCollections from "../components/UserMain/BigCollections";
import RecentItems from "../components/UserMain/RecentItems";
import TagCloud from "../components/UserMain/TagCloud";

export default () => {
  return (
    <Row>
      <Col>
        <BigCollections />
      </Col>
      <Col>
        <RecentItems />
      </Col>
      <Col>
        <TagCloud />
      </Col>
    </Row>
  );
};
