// GlobalModal.jsx
import React, { useEffect, useState } from "react";

const GlobalModal = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [modalContent, setModalContent] = useState(null);

  useEffect(() => {
    const showHandler = (event) => {
      setModalContent(event.detail.content);
      setIsVisible(true);
    };

    const hideHandler = () => {
      setIsVisible(false);
      setModalContent(null);
    };

    window.addEventListener("showModal", showHandler);
    window.addEventListener("hideModal", hideHandler);

    return () => {
      window.removeEventListener("showModal", showHandler);
      window.removeEventListener("hideModal", hideHandler);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        {modalContent}
        <button onClick={() => window.dispatchEvent(new Event("hideModal"))}>
          Close
        </button>
      </div>
    </div>
  );
};

export default GlobalModal;
