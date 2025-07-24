import { useState } from "react";
import styles from "@/styles/components/dropdown.module.css";

export default function Dropdown({
  placeholder,
  options,
  handleSelect,
  selectedOptions,
  isCheckbox,
  onChange,
  style,
  children,
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div style={style} className={styles["dropdown-wrapper"]}>
      <button className={styles.dropdown} onClick={() => setIsOpen(!isOpen)}>
        {placeholder}
      </button>

      {isOpen && <div className={styles["dropdown-options"]}>{children}</div>}
    </div>
  );
}
