import { useContext } from "react";
import { displayNameContext } from "@/context/DisplayNameContext";
import Button from "@/components/Button";
import HorizontalDivider from "./HorizontalDivider";
import styles from "@/styles/components/header.module.css";

export default function Header() {
  const { displayName, setDisplayName } = useContext(displayNameContext);

  const now = new Date();
  const localDate = now.toLocaleDateString("en-UK");

  return (
    <header className={styles.header}>
      <div className={styles["header-left"]}>
        {/*change name? */}
        <div className={styles.logo}>
          <img src="/pokeball.png" />
          <h1>pokémon</h1>
        </div>
        {displayName && (
          <>
            <div className={styles["horizontal-divider-container"]}>
              <HorizontalDivider />
            </div>

            <div className={styles["username-and-logout"]}>
              <p>{displayName}</p>
              <Button text="sign out" />
            </div>
          </>
        )}
      </div>

      <p className={styles["display-date"]}>{localDate}</p>
    </header>
  );
}
