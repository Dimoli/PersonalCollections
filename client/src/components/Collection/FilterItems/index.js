import React, { useRef } from "react";

export default (props) => {
  const { items, setItems, basicFieldsEntries } = props;
  const inputRef = useRef(null);

  const filterItems = () => {
    const regExp = /(\S+?)(=?[><=]=?)(\S+)/g;
    let filteredItems = items.slice();
    let itemIndex;
    let compareSign;

    Array.from(inputRef.current.value.matchAll(regExp)).forEach(
      (filter) => (
        (itemIndex = basicFieldsEntries.some((field) => field[0] === filter[1])
          ? 0
          : 1),
        (compareSign = filter[2] === "=" ? "===" : filter[2]),
        (filteredItems = filteredItems.filter((item) =>
          eval(`"${item[itemIndex][filter[1]]}"
            ${compareSign}
            "${filter[3]}"`)
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
        placeholder={`Use "<"/">" or "="; e.g. "id>10"`}
      />
      <div className="input-group-append">
        <button
          className="btn btn-success"
          // onClick={() => setItems([items[1], items[0]])}
          onClick={filterItems}
        >
          Filter
        </button>
      </div>
    </div>
  );
};
