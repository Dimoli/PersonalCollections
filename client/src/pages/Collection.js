import React, {
  useState,
  useEffect,
  useContext,
  useMemo,
  useCallback,
} from "react";
import { NavLink } from "react-router-dom";
import { Row, Col } from "react-bootstrap";
import ContentEditable from "react-contenteditable";

import useHttp from "../hooks/useHttp";
import authContext from "../context/auth";
import AddItem from "../components/Collection/AddItem/";
import CSVItems from "../components/Collection/CSVItems";
import DeleteItem from "../components/Collection/DeleteItem/";
import FilterItems from "../components/Collection/FilterItems/";

export default (props) => {
  const [collection, setCollection] = useState({});
  const [items, setItems] = useState([]);
  const { request, loading, error } = useHttp();
  const { userId } = useContext(authContext);

  const getCollection = useCallback(async () => {
    const receivedCollection = await request(
      `/collections/get/${props.match.params.idcoll}`,
      "POST",
      {
        userId,
      }
    );

    setCollection(receivedCollection);
  }, [userId]);

  useEffect(() => {
    getCollection();
  }, [userId]);
  useEffect(() => setItems(data), [collection]);

  const basicFieldsEntries = useMemo(
    () => Object.entries(collection?.itemFields?.basic || {}),
    [collection]
  );
  const additionalFieldsEntries = useMemo(
    () => Object.entries(collection?.itemFields?.additional || {}),
    [collection]
  );
  const data = useMemo(
    () =>
      collection?.items?.map((item) => [
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

  const onBlurItem = useCallback(
    async (event, itemId, fieldKey, fieldIndex) => {
      let fieldName;

      basicFieldsEntries.some((basicField) => basicField[0] === fieldKey)
        ? (fieldName = fieldKey)
        : (fieldName = additionalFieldsEntries.reduce(
            (acc, additionalFields) => (
              acc + additionalFields[1].length < fieldIndex
                ? (acc += additionalFields[1].length)
                : typeof acc === "object"
                ? acc
                : (acc = [additionalFields[0], fieldIndex - acc - 1]),
              acc
            ),
            -1
          ));

      await request(
        `/items/edit/fields/${collection.items[itemId]._id}`,
        "PATCH",
        {
          fieldName,
          fieldValue: event.target.textContent,
        }
      );

      getCollection();
    },
    [request, getCollection, collection]
  );

  const [isSortedData, setIsSortedData] = useState("false");

  const sortData = useCallback(
    (event) => {
      const sortedItemPart = event.target.name === "basic" ? 0 : 1;
      const fieldName = event.target.id;
      const sortedItem = (item) => item[sortedItemPart][fieldName];

      const sortedData = items.slice().sort((item, nextItem) => {
        item = sortedItem(item);
        nextItem = sortedItem(nextItem);

        if (Number.isNaN(+item)) return -1;

        return isSortedData ? item - nextItem : nextItem - item;
      });

      setItems(sortedData);
      setIsSortedData(!isSortedData);
    },
    [items]
  );

  const switchLike = useCallback(
    async (event) => {
      const itemId = collection.items[event.target.id]._id;
      let usersByLikes = items[event.target.id][2].slice();

      usersByLikes.includes(userId)
        ? (usersByLikes = usersByLikes.filter((user) => user != userId))
        : usersByLikes.push(userId);

      await request(`/items/edit/usersByLikes/${itemId}`, "PATCH", {
        usersByLikes,
      });

      getCollection();
    },
    [items, userId]
  );

  return (
    <Col>
      <Col className="mb-3">
        <Row as="h3" className="h-50 align-content-center ml-2 mt-4 mb-4">
          Data table
        </Row>
        <Row>
          <Col className="d-flex">
            <button
              className="btn btn-lg h-75 bg-success text-white m-2"
              onClick={() => setItems(data)}
            >
              All Items
            </button>
            <FilterItems
              items={items}
              setItems={setItems}
              basicFieldsEntries={basicFieldsEntries}
              additionalFieldsEntries={additionalFieldsEntries}
            />
          </Col>
          <Col className="text-right">
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
      <Row>
        <table className="table table-hover">
          <thead className="thead-dark">
            <tr>
              {basicFieldsEntries.map((field, index) => (
                <th
                  key={index}
                  id={field[1]}
                  accessKey={"basic"}
                  onClick={sortData}
                >
                  {field[1]}
                </th>
              ))}
              {additionalFieldsEntries.map((fields) =>
                fields[1].map((field, index) => (
                  <th
                    key={index}
                    id={field}
                    accessKey={"additional"}
                    onClick={sortData}
                  >
                    {field}
                  </th>
                ))
              )}
              <th />
            </tr>
          </thead>
          <tbody>
            {items.map((item, itemIndex) => (
              <tr key={itemIndex}>
                {[item[0], item[1]].map((fields) =>
                  Object.entries(fields).map((field, fieldIndex) => (
                    <ContentEditable
                      key={fieldIndex}
                      html={field[1].toString()}
                      onBlur={(event) =>
                        onBlurItem(event, itemIndex, field[0], fieldIndex)
                      }
                      tagName="td"
                    />
                  ))
                )}
                <td className="d-flex justify-content-around">
                  <i
                    id={itemIndex}
                    className={`fa fa-heart${
                      item[2]?.includes(userId) ? " text-warning" : "-o"
                    }`}
                    aria-hidden="true"
                    onClick={switchLike}
                  />
                  <NavLink to={`${props.match.url}/items/${item[0].id}`}>
                    <i className="fa fa-external-link" aria-hidden="true" />
                  </NavLink>
                  <DeleteItem
                    id={itemIndex}
                    collection={collection}
                    getCollection={getCollection}
                    request={request}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Row>
    </Col>
  );
};
