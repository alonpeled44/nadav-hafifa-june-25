import { useEffect, useRef } from "react";
import styles from "@/styles/components/modal.module.css"

export default function Modal ({ isOpen, onClose, children}) {
    const dialogRef = useRef(null);

    useEffect(() => {
        const dialog = dialogRef.current;
        if (isOpen && dialog && !dialog.open) {
          dialog.showModal();
        } else if (!isOpen && dialog?.open) {
          dialog.close();
        }
      }, [isOpen]);

      const onClick = (e) => {
        if (e.target === dialogRef.current) {
          onClose();
        }
      };

      return (
        <dialog className={styles.modal} ref={dialogRef} onClick={onClick} onClose={onClose}>
            <div className={styles["modal-content-wrapper"]}>
                {children}
            </div>
        </dialog>
      );
}