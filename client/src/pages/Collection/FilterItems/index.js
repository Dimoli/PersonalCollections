import React, { useRef, useMemo, useCallback } from "react";

export default (props) => {
  const {
    items,
    setItems,
    basicFieldsEntries,
    additionalFieldsEntries,
  } = props;
  const inputRef = useRef(null);

  const allFieldsValues = useMemo(
    () => [
      ...basicFieldsEntries.map((field) => field[1]),
      ...additionalFieldsEntries.reduce(
        (acc, fields) => (
          (acc = [...acc, ...fields[1].map((field) => field.toString())]), acc
        ),
        []
      ),
    ],
    [basicFieldsEntries, additionalFieldsEntries]
  );
  const isFieldValue = useCallback(
    (fieldValue) => allFieldsValues.includes(fieldValue),
    [allFieldsValues]
  );
  const checkValueType = useCallback(
    (value) => (Number.isNaN(+value) ? value.toString() : +value),
    []
  );

  const filterItems = () => {
    const regExp = /(\S+?)([><=]=?)(\S+)/g;
    let filteredItems = items.slice();
    let isItemField;
    let itemIndex;
    let compareSign;

    Array.from(inputRef.current.value.matchAll(regExp)).forEach(
      (filter) => (
        (isItemField = isFieldValue(filter[1])),
        (itemIndex = basicFieldsEntries.some((field) => field[0] === filter[1])
          ? 0
          : 1),
        (compareSign = filter[2] === "=" ? "===" : filter[2]),
        (filteredItems = filteredItems.filter((item) =>
          eval(`checkValueType("${
            isItemField ? item[itemIndex][filter[1]] : filter[1]
          }")
            ${compareSign}
            checkValueType("${
              isItemField ? filter[3] : item[itemIndex][filter[3]]
            }")`)
        ))
      )
    );

    setItems(filteredItems);
  };

  return (
    <div className="input-group h-50 w-50 m-3">
      <input
        ref={inputRef}
        type="text"
        className="form-control"
        data-placement="top"
        title={`Use "<"/">" or "="; e.g. "id>10"`}
        placeholder={`Use "<"/">" or "="; e.g. "id>10"`}
      />
      <div className="input-group-append">
        <button
          className="btn btn-success"
          data-placement="top"
          title="Filter items"
          onClick={filterItems}
        >
          Filter
        </button>
      </div>
    </div>
  );
};
