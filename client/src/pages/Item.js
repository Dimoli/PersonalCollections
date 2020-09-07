import React, { useState, useEffect, useMemo, useCallback } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import SocketIOClient from "socket.io-client";

export default () => {
  let socket = useMemo(() => SocketIOClient(), [SocketIOClient]);
  const [comments, setComments] = useState([
    {
      content: "йцуйцуууууууууууууу",
      date: new Date().toLocaleString(),
      // active: true,
    },
  ]);

  useEffect(() => {
    socket.on("updateItemComments", (comms) => {
      setComments(comms);
    });

    return () => socket.disconnect();
  }, []);

  const handleAddButton = () => {
    const updatedComments = [
      ...comments,
      {
        content: "qwreqeqq!!!r",
        date: new Date().toLocaleString(),
        // active: false,
      },
    ];

    socket.emit("updateItemComments", updatedComments);
  };

  /*   const appendComments = useCallback(() => {
    let updatedComments = comments.slice();
    const firstInactiveComment =
      comments.findIndex((comment) => comment.active === false) + 1;

    for (let i = 0; i < 5; i++) {
      updatedComments[i + firstInactiveComment] = {
        ...updatedComments[i + firstInactiveComment],
        active: true,
      };
    }

    setComments(updatedComments);
  }, [comments, setComments]);

  const [onScroll, containerRef] = useLazyComments({
    onIntersection: appendComments,
    delay: 1200,
  }); */

  return (
    <Container>
      <Button variant="primary" onClick={handleAddButton}>
        Add Comment
      </Button>
      {comments.map((comment, index) => (
        <Comment key={index} comment={comment.content} date={comment.date} />
      ))}
    </Container>
  );
};

const Comment = (props) => {
  return (
    <Col>
      <Col>
        <Row className="font-weight-bold">Дима</Row>
        <Row>{props.date}</Row>
      </Col>
      <p className="comment-content w-75 m-0">{props.comment}</p>
      <Row>
        <Button variant="primary">Reply to comment</Button>
      </Row>
    </Col>
  );
};
