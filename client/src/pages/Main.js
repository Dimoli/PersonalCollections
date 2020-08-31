import React from "react";
import { Row, Col } from "react-bootstrap";

import BigCollections from "../components/Main/BigCollections";
import RecentItems from "../components/Main/RecentItems";
import TagCloud from "../components/Main/TagCloud";

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
