import React, { useState, useEffect, useContext, useMemo } from "react";
import { NavLink } from "react-router-dom";
import { Row, Col } from "react-bootstrap";
import { CSVLink } from "react-csv";

import useHttp from "../hooks/useHttp";
import authContext from "../context/auth";
import AddItem from "../components/Collection/AddItem/";

export default (props) => {
  const [collection, setCollection] = useState({});
  const { request, loading, error } = useHttp();
  const { userId } = useContext(authContext);
  const basicFieldsEntries = useMemo(
    () => Object.entries(collection?.itemFields?.basic || {}),
    [collection]
  );
  const additionalFieldsEntries = useMemo(
    () => Object.entries(collection?.itemFields?.additional || {}),
    [collection]
  );

  useEffect(() => {
    const getCollection = async () => {
      const collection = await request(
        `/collections/get/${props.match.params.idcoll}`,
        "POST",
        {
          userId,
        }
      );

      setCollection(collection);
    };

    getCollection();
  }, [userId]);

  /*   const structedData =
    collection?.items?.map((item) => [
      basicFieldsEntries.reduce(
        (acc, field) => ((acc[field[0]] = item[field[0]]), acc),
        {}
      ),
      additionalFieldsEntries.reduce(
        (acc, fields) => (
          (acc = {
            ...acc,
            ...fields[1].reduce(
              (acc, field, index) => (
                (acc[field] = item[fields[0]][index]), acc
              ),
              {}
            ),
          }),
          acc
        ),
        {}
      ),
    ]) || []; */
  const headers =
    [
      ...basicFieldsEntries.map((field) => ({
        label: field[1],
        key: field[1],
      })),
      ...additionalFieldsEntries.reduce(
        (acc, fields) => (
          (acc = [
            ...acc,
            ...fields[1].reduce(
              (acc, field) => (
                acc.push({ label: field.toString(), key: field.toString() }),
                acc
              ),
              []
            ),
          ]),
          acc
        ),
        []
      ),
    ] || [];
  /*   const data = structedData.map((data) => ({ ...data[0], ...data[1] })); */

  const data =
    collection?.items?.map((item) => ({
      ...basicFieldsEntries?.reduce(
        (acc, field) => ((acc[field[0]] = item[field[0]]), acc),
        {}
      ),
      ...additionalFieldsEntries?.reduce(
        (acc, fields) => (
          (acc = {
            ...acc,
            ...fields[1].reduce(
              (acc, field, index) => (
                (acc[field] = item[fields[0]][index]), acc
              ),
              {}
            ),
          }),
          acc
        ),
        {}
      ),
    })) || [];

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
              headers={headers}
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
              {basicFieldsEntries.map((field, index) => (
                <th key={index}>{field[1]}</th>
              ))}
              {additionalFieldsEntries.map((fields) =>
                fields[1].map((field, index) => <th key={index}>{field}</th>)
              )}
            </tr>
          </thead>
          <tbody>
            {collection?.items?.map((item) => (
              <tr key={item.id}>
                {basicFieldsEntries?.map((field, index) => (
                  <td key={index}>
                    <NavLink to={`${props.match.url}/item/${item.id}`}>
                      {item[field[0]]}
                    </NavLink>
                  </td>
                ))}
                {additionalFieldsEntries?.map((fields) =>
                  item[fields[0]].map((field, index) => (
                    <td key={index}>
                      <NavLink to={`${props.match.url}/item/${item.id}`}>
                        {field}
                      </NavLink>
                    </td>
                  ))
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </Row>
    </Col>
  );
};
