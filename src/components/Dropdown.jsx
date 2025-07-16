import { useState } from "react";
import styles from "@/styles/components/dropdown.module.css";

export default function Dropdown({
  placeholder,
  options,
  handleSelect,
  selectedOptions,
  isCheckbox,
  onChange,
}) {
  const [isOpen, setIsOpen] = useState(false);

  const onClick = () => {
    setIsOpen(!isOpen);
  };

  console.log(options.find((optiopn) => optiopn === "impostor"));
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
            <label className={styles.option} onClick={handleSelect}>
              {isCheckbox && (
                <input
                  type="checkbox"
                  value={option}
                  onChange={onChange}
                  checked={selectedOptions.includes(option)}
                />
              )}
              {/* instead of this use isCheckbox and pass true/false when creating dropdown in homepage like chatgpt said*/}
              {option}
            </label>
          ))}
        </div>
      )}
    </div>
  );
}

//this doesnt fucking work :DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD
/*instead of having conditional rendering to only appear ifOpen
  have it apply a style to just set width and height to 0??? prolly wont work but idfk what else to do*/
/* ok instead of jus having basic checkboxes have a usestate array for filter (push/pop when a box is checked)
   and normal usestate for sort by (onClick for every option) fmlllllllllllllllll*/
