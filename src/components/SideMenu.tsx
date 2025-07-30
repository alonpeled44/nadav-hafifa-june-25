import { useState } from "react";
import { DropdownProps } from "@/types/components";
import styles from "@/styles/components/side-menu.module.css";

export default function SideMenu({ placeholder, children }: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={styles["side-menu-wrapper"]}>
      <button
        className={styles["side-menu"]}
        onClick={() => setIsOpen(!isOpen)}
      >
        {placeholder}
      </button>

      {isOpen && <div className={styles["side-menu-options"]}>{children}</div>}
    </div>
  );
}
