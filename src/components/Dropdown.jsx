import { useState } from "react";
import styles from "@/styles/components/dropdown.module.css";

export default function Dropdown({
  placeholder,
  options,
  handleSelect,
  selectedOptions,
  isCheckbox,
  onChange,
  children,
  style
}) {
  const [isOpen, setIsOpen] = useState(false);

  const onClick = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div style={style} className={styles["dropdown-wrapper"]}>
      <button className={styles.dropdown} onClick={onClick}>
        {placeholder}
      </button>

      {isOpen && (
        <div
          className={`${styles["dropdown-options"]} ${
            isOpen ? styles["dropdown-open"] : ""
          }`}
        >
          {children}
        </div>
      )}
    </div>
  );
}