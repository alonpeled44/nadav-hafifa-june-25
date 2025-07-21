import { useState } from "react";
import styles from "@/styles/components/side-menu.module.css";

export default function SideMenu({
  placeholder,
  children,
  style
}) {
  const [isOpen, setIsOpen] = useState(false);

  const onClick = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div style={style} className={styles["side-menu-wrapper"]}>
      <button className={styles["side-menu"]} onClick={onClick}>
        {placeholder}
      </button>

      {isOpen && (
        <div
          className={`${styles["side-menu-options"]} ${
            isOpen ? styles["side-menu-open"] : ""
          }`}
        >
          {children}
        </div>
      )}
    </div>
  );
}