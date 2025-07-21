import { useState } from "react";
import styles from "@/styles/components/side-menu.module.css";

export default function SideMenu({ placeholder, style, children }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div style={style} className={styles["side-menu-wrapper"]}>
      <button className={styles["side-menu"]} onClick={setIsOpen(!isOpen)}>
        {placeholder}
      </button>

      {isOpen && <div className={styles["side-menu-options"]}>{children}</div>}
    </div>
  );
}
