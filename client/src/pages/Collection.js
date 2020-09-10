import React, { useState, useEffect, useContext } from "react";
import { NavLink } from "react-router-dom";
import { Row, Col } from "react-bootstrap";
import { CSVLink } from "react-csv";

import useHttp from "../hooks/useHttp";
import authContext from "../context/auth";
import AddItem from "../components/Collection/AddItem/";

export default (props) => {
  const [collection, setCollection] = useState([]);
  const { request, loading, error } = useHttp();
  const { userId } = useContext(authContext);

  useEffect(() => {
    const getCollection = async () => {
      const collection = await request("", "POST", {
        userId,
      });

      setCollection(collection);
    };

    getCollection();
  }, [userId, collection]);

  const data = [
    { id: 1, name: "Books", tag: "#mind" },
    { id: 2, name: "Tea", tag: "#milk" },
  ];

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
            <AddItem
              collection={collection}
              setCollection={setCollection}
              request={request}
              loading={loading}
              error={error}
            />
            <CSVLink
              data={data}
              filename={"my-file.csv"}
              className="btn btn-lg h-75 bg-secondary text-white m-2"
              target="_blank"
            >
              Export CSV
            </CSVLink>
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
            {/*             {collection.items.map((item) => (
              <tr key={item.id}>
                <th>
                  <NavLink to={`${props.match.url}/item/${item.id}`}>
                    {item.id}
                  </NavLink>
                </th>
                <td>
                  <NavLink to={`${props.match.url}/item/${item.id}`}>
                    {item.name}
                  </NavLink>
                </td>
                <td>
                  <NavLink to={`${props.match.url}/item/${item.id}`}>
                    {item.tag}
                  </NavLink>
                </td>
              </tr>
            ))} */}
          </tbody>
        </table>
      </Row>
    </Col>
  );
};
