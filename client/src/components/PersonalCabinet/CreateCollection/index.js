import React, { useState } from "react";

import ModalCreate from "./ModalCreate/";

const CreateCollection = () => {
  const [modalShow, setModalShow] = useState(false);

  return (
    <>
      <div className="add-collection col-1">
        <button
          className="btn btn-outline-primary"
          onClick={() => setModalShow(true)}
        >
          Create Collection
        </button>
      </div>
      <ModalCreate show={modalShow} onHide={() => setModalShow(false)} />
    </>
  );
};

export default CreateCollection;
