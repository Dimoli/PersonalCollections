import React, { useCallback } from "react";

export default (props) => {
  const { id, collection, getCollection, request } = props;

  const deleteItem = useCallback(
    async (event) => {
      await request(
        `/items/delete/${collection.items[event.target.id]._id}`,
        "DELETE"
      );

      getCollection();
    },
    [collection]
  );

  return (
    <i
      id={id}
      className="fa fa-times text-primary"
      aria-hidden="true"
      onClick={deleteItem}
    />
  );
};
