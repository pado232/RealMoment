import React from "react";
import Modal from "react-modal";
import { FiX } from "react-icons/fi";

const ModalContainer = ({ isOpen, onRequestClose, children, customStyles }) => {
  const iconSize = 9 * 3;
  return (
    <Modal isOpen={isOpen} onRequestClose={onRequestClose} style={customStyles}>
      <div style={{ display: "flex", margin: "10px" }}>
        {children}
        <FiX
          onClick={onRequestClose}
          size={iconSize}
          style={{ cursor: "pointer" }}
        />
      </div>
    </Modal>
  );
};

export default ModalContainer;
