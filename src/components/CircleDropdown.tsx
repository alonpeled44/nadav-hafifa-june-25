import { useState } from "react";
import { DropdownProps } from "@/types/components";

import styles from "@/styles/components/circle-dropdown.module.css";

export default function CircleDropdown({
  placeholder,
  children,
}: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={styles["circle-dropdown-wrapper"]}>
      <button
        className={styles["circle-dropdown"]}
        onClick={() => setIsOpen(!isOpen)}
      >
        {placeholder}
      </button>

      {isOpen && (
        <div className={styles["circle-dropdown-options"]}>{children}</div>
      )}
    </div>
  );
}
