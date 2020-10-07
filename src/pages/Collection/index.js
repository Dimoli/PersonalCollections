import React, { useState, useEffect, useMemo, useCallback } from "react";
import { Row, Col } from "react-bootstrap";

import useHttp from "../../hooks/useHttp";

import AddItem from "./AddItem";
import CSVItems from "./CSVItems";
import FilterItems from "./FilterItems";
import Items from "./Items";

export default (props) => {
  const [collection, setCollection] = useState({});
  const [items, setItems] = useState([]);
  const { request, loading, error } = useHttp();

  const getCollection = useCallback(async () => {
    const receivedCollection = await request(
      `${process.env.REACT_APP_URL}collections/get/${props.match.params.idcoll}`,
      "POST"
    );

    setCollection(receivedCollection);
  }, [request, props.match.params.idcoll]);

  useEffect(() => {
    getCollection();
  }, [getCollection]);
  useEffect(() => setItems(data), [collection]);

  const basicFieldsEntries = useMemo(
    () => Object.entries(collection.itemFields?.basic || {}),
    [collection]
  );
  const additionalFieldsEntries = useMemo(
    () => Object.entries(collection.itemFields?.additional || {}),
    [collection]
  );
  const data = useMemo(
    () =>
      collection.items?.map((item) => [
        basicFieldsEntries?.reduce(
          (acc, field) => ((acc[field[0]] = item[field[0]]), acc),
          {}
        ),
        additionalFieldsEntries?.reduce(
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
        item.usersByLikes,
      ]) || [],
    [collection]
  );

  return (
    <Col>
      <Col className="mb-3">
        <Row as="h3" className="h-50 align-content-center ml-2 mt-4 mb-4">
          {collection.name}
        </Row>
        <Row>
          <Col className="d-flex justify-content-center">
            <button
              className="btn btn-lg h-75 bg-success text-white m-2"
              data-placement="top"
              title="Show all items"
              onClick={() => setItems(data)}
            >
              All
            </button>
            <FilterItems
              items={items}
              setItems={setItems}
              basicFieldsEntries={basicFieldsEntries}
              additionalFieldsEntries={additionalFieldsEntries}
            />
          </Col>
          <Col className="d-flex justify-content-center text-right">
            <AddItem
              collection={collection}
              setCollection={setCollection}
              request={request}
              loading={loading}
              error={error}
            />
            <CSVItems
              basicFieldsEntries={basicFieldsEntries}
              additionalFieldsEntries={additionalFieldsEntries}
              data={data}
            />
          </Col>
        </Row>
      </Col>
      <Items
        items={items}
        setItems={setItems}
        basicFieldsEntries={basicFieldsEntries}
        additionalFieldsEntries={additionalFieldsEntries}
        collection={collection}
        getCollection={getCollection}
        request={request}
        url={props.match.url}
      />
    </Col>
  );
};
