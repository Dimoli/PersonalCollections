import React, { useState } from "react";

import ModalAddItem from "./ModalAddItem/";

export default (props) => {
  const [modalShow, setModalShow] = useState(false);

  return (
    <>
      <button
        className="btn btn-lg h-75 bg-success text-white m-2"
        onClick={() => setModalShow(true)}
      >
        Add Item
      </button>
      <ModalAddItem
        show={modalShow}
        onHide={() => setModalShow(false)}
        {...props}
      />
    </>
  );
};
