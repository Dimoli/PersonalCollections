import React, { useState } from "react";
import { Toast } from "react-bootstrap";

const useToast = () => {
  const [toast, setToast] = useState({ show: false, message: "" });

  return {
    CustomToast: () => (
      <Toast
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          color: "red",
        }}
        onClose={() => setToast({ ...toast, show: false })}
        show={toast.show}
        delay={3000}
        autohide
      >
        <Toast.Body>{toast.message}</Toast.Body>
      </Toast>
    ),
    showToastMessage: (message) => setToast({ show: true, message }),
  };
};

export default useToast;
