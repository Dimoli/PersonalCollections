import React, { useState } from "react";
import { Modal, Image, Row, Col } from "react-bootstrap";
import { useDropzone } from "react-dropzone";

const CollectionImage = () => {
  const [files, setFiles] = useState([]);

  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/*",
    onDrop: (acceptedFiles) => {
      setFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      );
    },
  });

  const images = files.map((file) => (
    <React.Fragment key={file.name}>
      <Image src={file.preview} className="w-100 h-100" rounded />
    </React.Fragment>
    // URL for posting on Backend
    /* {
      let reader = new FileReader();
      reader.readAsDataURL(file);
      console.log(reader);
    } */
  ));

  return (
    <Col>
      <Modal.Title as="h4" className="text-center">
        Collection image
      </Modal.Title>
      <Row
        {...getRootProps()}
        className="w-100 h-75 justify-content-center align-items-center mt-3 ml-1"
      >
        <input {...getInputProps()} />
        <Row className={files.length > 0 ? "d-none" : "d-block"}>
          <Row>Hello there</Row>
        </Row>
        {images}
      </Row>
    </Col>
  );
};

export default CollectionImage;
