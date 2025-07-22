import { useEffect, useRef } from "react";
import styles from "@/styles/components/modal.module.css";

export default function Modal({ isOpen, onClose, children }) {
  const dialogRef = useRef(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (isOpen && dialog && !dialog.open) {
      dialog.showModal();
    } else if (!isOpen && dialog?.open) {
      dialog.close();
    }
  }, [isOpen]);

  return (
    <dialog
      className={styles.modal}
      ref={dialogRef}
      onClick={(event) => {
        if (event.target === dialogRef.current) {
          onClose();
        }
      }}
      onClose={onClose}
    >
      <div className={styles["modal-content-wrapper"]}>{children}</div>
    </dialog>
  );
}
