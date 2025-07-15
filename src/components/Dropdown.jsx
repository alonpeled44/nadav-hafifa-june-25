import { useState } from "react";
import styles from "@/styles/components/dropdown.module.css";

export default function Dropdown({ placeholder, arr, option }) {
  const [filterOpen, setFilterOpen] = useState(false);

  const onClick = () => {
    setFilterOpen(!filterOpen);
  };

  return (
    <div className={styles["dropdown-wrapper"]}>
      <button className={styles.dropdown} onClick={onClick}>
        {placeholder}
      </button>

      <div
        className={`${styles["dropdown-options"]} ${
          filterOpen ? styles["dropdown-open"] : ""
        }`}
      >
        {arr.map((i) => (
          <label className={styles.option}>
            {option}
            {i}
          </label>
        ))}
      </div>
    </div>
  );
}

//this doesnt fucking work :DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD
/*instead of having conditional rendering to only appear ifOpen
  have it apply a style to just set width and height to 0??? prolly wont work but idfk what else to do*/
/* ok instead of jus having basic checkboxes have a usestate array for filter (push/pop when a box is checked)
   and normal usestate for sort by (onClick for every option) fmlllllllllllllllll*/
