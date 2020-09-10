import React, { useState } from "react";
import { Modal, Image, Row, Col } from "react-bootstrap";
import { useDropzone } from "react-dropzone";

export default (props) => {
  const { collection, setCollection } = props;
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
  let reader = new FileReader();

  const images = files.map((file) => {
    // Object with Base64-URL for posting on Backend
    reader.readAsDataURL(file);

    return (
      <React.Fragment key={file.name}>
        <Image src={file.preview} className="w-100 h-100" rounded />
      </React.Fragment>
    );
  });

  return (
    <Col>
      <Modal.Title as="h4" className="text-center">
        Collection image
      </Modal.Title>
      <Row
        {...getRootProps()}
        onLoad={() => {
          setCollection({ ...collection, collectionImage: reader });
        }}
        className="w-100 h-50 justify-content-center align-items-center mt-2 ml-1"
      >
        <input {...getInputProps()} />
        <Row className={files.length > 0 ? "d-none" : "d-block"}>
          <Row className="w-50 text-center m-auto">
            Drag 'n' drop some files here, or click to select files
          </Row>
        </Row>
        {images}
      </Row>
    </Col>
  );
};
