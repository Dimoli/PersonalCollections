import React, { useState, useContext, useCallback } from "react";
import { NavLink } from "react-router-dom";
import { Row, Form } from "react-bootstrap";
import ContentEditable from "react-contenteditable";

import authContext from "../../helpers/context/auth";

import DeleteItem from "./DeleteItem";

export default (props) => {
  const {
    items,
    setItems,
    basicFieldsEntries,
    additionalFieldsEntries,
    collection,
    getCollection,
    request,
    url,
  } = props;
  const { userId } = useContext(authContext);
  const [isSortedData, setIsSortedData] = useState("false");

  const sortData = useCallback(
    (event) => {
      const sortedItemPart = event.target.accessKey === "basic" ? 0 : 1;
      const fieldName = event.target.id;
      const sortedItem = (item) => item[sortedItemPart][fieldName];

      const sortedData = items.slice().sort((item, nextItem) => {
        item = sortedItem(item);
        nextItem = sortedItem(nextItem);

        if (Number.isNaN(+item))
          return new Intl.Collator().compare(item, nextItem) ? -2 : -1;

        return isSortedData ? item - nextItem : nextItem - item;
      });

      setItems(sortedData);
      setIsSortedData(!isSortedData);
    },
    [items]
  );

  const onBlurItem = useCallback(
    async (fieldValue, itemId, fieldKey, fieldIndex) => {
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
        `${process.env.REACT_APP_URL}items/edit/fields/${collection.items[itemId]._id}`,
        "PATCH",
        {
          fieldName,
          fieldValue,
        }
      );

      getCollection();
    },
    [request, getCollection, collection]
  );

  const switchLike = useCallback(
    async (event) => {
      const itemIndex = event.target.id;
      const itemId = collection.items[itemIndex]._id;
      let updatedItems = items.slice();
      let usersByLikes = items[itemIndex][2].slice();

      usersByLikes.includes(userId)
        ? (usersByLikes = usersByLikes.filter((user) => user != userId))
        : usersByLikes.push(userId);

      updatedItems[itemIndex][2] = usersByLikes;
      setItems(updatedItems);

      await request(
        `${process.env.REACT_APP_URL}items/edit/usersByLikes/${itemId}`,
        "PATCH",
        {
          usersByLikes,
        }
      );
    },
    [items, userId]
  );

  const onChangeTag = (value, itemIndex) => {
    let updatedItems = items.slice();
    updatedItems[itemIndex][0].tag = value;

    setItems(updatedItems);
  };

  return (
    <Row className="overflow-auto">
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
                <th key={index} id={field} onClick={sortData}>
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
                Object.entries(fields).map((field, fieldIndex) =>
                  !(field[0] === "tag") ? (
                    <ContentEditable
                      key={fieldIndex}
                      html={field[1].toString()}
                      onBlur={(event) =>
                        onBlurItem(
                          event.target.textContent,
                          itemIndex,
                          field[0],
                          fieldIndex
                        )
                      }
                      tagName="td"
                    />
                  ) : (
                    <td key={fieldIndex}>
                      <Form>
                        <Form.Control
                          name={fieldIndex}
                          value={field[1].toString()}
                          onChange={(event) =>
                            onChangeTag((event.target.value, itemIndex))
                          }
                          onBlur={(event) =>
                            onBlurItem(
                              event.target.value,
                              itemIndex,
                              field[0],
                              fieldIndex
                            )
                          }
                          required
                        />
                      </Form>
                    </td>
                  )
                )
              )}
              <td className="d-flex flex-wrap justify-content-around">
                <i
                  id={itemIndex}
                  className={`fa fa-heart${
                    item[2]?.includes(userId) ? " text-warning" : "-o"
                  } px-2 pb-2 pb-md-0`}
                  aria-hidden="true"
                  onClick={switchLike}
                />
                <NavLink
                  className="px-2 pb-2 pb-md-0"
                  to={`${url}/items/${collection.items[itemIndex]?._id}`}
                >
                  <i className="fa fa-external-link" aria-hidden="true" />
                </NavLink>
                <DeleteItem
                  className="px-2 pb-2 pb-md-0"
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
  );
};
