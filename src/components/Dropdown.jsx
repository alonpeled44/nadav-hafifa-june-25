import { useState } from "react";
import styles from "@/styles/components/dropdown.module.css";

export default function Dropdown({
  placeholder,
  options,
  handleSelect,
  selectedOptions,
  isCheckbox = false,
  onChange,
}) {
  const [isOpen, setIsOpen] = useState(false);

  const onClick = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={styles["dropdown-wrapper"]}>
      <button className={styles.dropdown} onClick={onClick}>
        {placeholder}
      </button>

      {isOpen && (
        <div
          className={`${styles["dropdown-options"]} ${
            isOpen ? styles["dropdown-open"] : ""
          }`}
        >
          {options.map((option) => (
            <label
              className={`${styles.option} ${
                !isCheckbox ? styles["select-option"] : ""
              }`}
              key={option}
              onClick={!isCheckbox ? () => handleSelect(option) : undefined}
            >
              {isCheckbox && (
                <input
                  type="checkbox"
                  value={option}
                  onChange={onChange}
                  checked={selectedOptions.includes(option)}
                />
              )}
              {option}
            </label>
          ))}
        </div>
      )}
    </div>
  );
}
