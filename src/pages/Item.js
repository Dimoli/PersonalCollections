import React, { useState, useEffect, useMemo } from "react";
import {
  Container,
  Row,
  Col,
  Button,
  InputGroup,
  FormControl,
} from "react-bootstrap";
import SocketIOClient from "socket.io-client";

import useHttp from "../hooks/useHttp";

export default (props) => {
  const itemId = props.match.params.iditem;
  let socket = useMemo(() => SocketIOClient(), []);
  const { request } = useHttp();
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const getComments = async () => {
      const receivedComments = await request(
        `${process.env.REACT_APP_URL}items/get/${itemId}`,
        "POST"
      );

      setComments(receivedComments);
    };
    getComments();

    socket.emit("joinToRoom", itemId);
    socket.on("updateItemComments", (comms) => {
      setComments(comms);
    });

    return () => socket.disconnect();
  }, [request, itemId, socket]);

  const updateShowAddComments = (comments, id) => {
    let updatedShowAddComments = comments.slice();

    updatedShowAddComments[id].showAdd = !updatedShowAddComments[id].showAdd;

    return updatedShowAddComments;
  };

  const updateComments = (id) => {
    const updatedComments = updateShowAddComments(comments, id);

    setComments(updatedComments);
  };

  const addComment = (event, id) => {
    let updatedComments = updateShowAddComments(comments, id);

    if (event.currentTarget.control.value === "") return;

    updatedComments = [
      ...updatedComments,
      {
        content: event.currentTarget.control.value,
        date: new Date().toLocaleString(),
        showAdd: false,
      },
    ];

    socket.emit("updateItemComments", {
      itemId: itemId,
      comments: updatedComments,
    });
  };

  return (
    !!comments.length && (
      <Container className="mt-4">
        {comments.length === 1 ? (
          <AddComment comment={comments[0]} addComment={addComment} id="0" />
        ) : (
          comments.map(
            (comment, index) =>
              !!index && (
                <Comment
                  key={index}
                  content={comment.content}
                  date={comment.date}
                  updateComments={updateComments}
                  comment={comment}
                  addComment={addComment}
                  id={index}
                />
              )
          )
        )}
      </Container>
    )
  );
};

const Comment = (props) => {
  const { content, date, updateComments, comment, addComment, id } = props;

  return (
    <>
      <Col className="card mt-4">
        <Row className="card-header font-weight-bold">Дима</Row>
        <p className="comment-content w-75 m-0">{content}</p>
        <Row className="card-footer">{date}</Row>
      </Col>
      <Button
        className={`${comment?.showAdd ? "d-none" : ""} mt-1 ml-1`}
        variant="primary"
        onClick={() => updateComments(id)}
      >
        Reply to comment
      </Button>
      <AddComment comment={comment} addComment={addComment} id={id} />
    </>
  );
};

const AddComment = (props) => {
  const { comment, addComment, id } = props;

  return (
    comment?.showAdd && (
      <InputGroup className="mt-3">
        <label htmlFor="comment" onClick={(event) => addComment(event, id)}>
          <InputGroup.Append className="h-100">
            <Button variant="primary">Add Comment</Button>
          </InputGroup.Append>
        </label>
        <FormControl
          as="textarea"
          aria-label="With textarea"
          placeholder="Write your comment"
          id="comment"
        />
      </InputGroup>
    )
  );
};
