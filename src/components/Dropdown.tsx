import { useState } from "react";
import { DropdownProps } from "@/types/components";

import styles from "@/styles/components/dropdown.module.css";

export default function Dropdown({ placeholder, children }: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={styles["dropdown-wrapper"]}>
      <button className={styles.dropdown} onClick={() => setIsOpen(!isOpen)}>
        {placeholder}
      </button>

      {isOpen && <div className={styles["dropdown-options"]}>{children}</div>}
    </div>
  );
}
