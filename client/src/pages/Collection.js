import React, { useState } from "react";
import { Row, Col } from "react-bootstrap";

export default () => {
  const [items, setItems] = useState([{ id: 1, name: "Books", tag: "#mind" }]);

  return (
    <Col>
      <Col className="mb-3">
        <Row as="h3" className="h-50 align-content-center ml-2 mt-4 mb-4">
          Data table
        </Row>
        <Row>
          <Col>
            <button className="btn btn-lg h-75 bg-success text-white m-2">
              All Properties
            </button>
            <button className="btn btn-lg h-75 bg-secondary text-white m-2">
              Today
            </button>
            <button className="btn btn-lg h-75 bg-secondary text-white m-2">
              Filters
            </button>
          </Col>
          <Col className="text-right">
            <button className="btn btn-lg h-75 bg-success text-white m-2">
              ADD ITEM
            </button>
            <button className="btn btn-lg h-75 bg-secondary text-white m-2">
              Export CSV
            </button>
          </Col>
        </Row>
      </Col>
      <Row>
        <table className="table table-hover">
          <thead className="thead-dark">
            <tr>
              <th>Id</th>
              <th>Name</th>
              <th>Tag</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id}>
                <th>{item.id}</th>
                <td>{item.name}</td>
                <td>{item.tag}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Row>
    </Col>
  );
};
