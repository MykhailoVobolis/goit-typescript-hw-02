// import "./ImageModal.css";
import css from "./ImageModal.module.css";
import Modal from "react-modal";

Modal.setAppElement("#root");

export default function ImageModal({ isOpen, onClose, lageImage }) {
  return (
    <Modal
      isOpen={isOpen}
      overlayClassName={{
        base: css.modalContainer,
        afterOpen: css.afterModalContainerOpen,
        beforeClose: css.beforeModalContainerClose,
      }}
      className={{
        base: css.modalContent,
        afterOpen: css.afterModalContentOpen,
        beforeClose: css.beforeModalContentClose,
      }}
      closeTimeoutMS={500}
      onRequestClose={onClose}>
      <img className={css.lageImage} src={lageImage.urls.regular} alt={lageImage.alt_description} />
    </Modal>
  );
}
