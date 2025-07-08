import { useContext } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { DisplayNameContext } from "@/context/DisplayNameContext";
import Button from "@/components/Button";
import HorizontalDivider from "@/components/HorizontalDivider";
import styles from "@/styles/components/header.module.css";

export default function Header() {
  const { displayName, setDisplayName } = useContext(DisplayNameContext);

  const localDate = new Date().toLocaleDateString("en-UK");

  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    router.push("/login");
    setDisplayName("");
  };

  return (
    <header className={styles.header}>
      <div className={styles["logo-and-user-information"]}>
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
              <Button text="sign out" onClick={handleLogout} />
            </div>

            <div className={styles["horizontal-divider-container"]}>
              <HorizontalDivider />
            </div>

            <div className={styles.links}>
              <Link className={styles["header-link"]} href="/">
                pokédex
              </Link>
              <Link className={styles["header-link"]} href="/guess-pokemon">
                guess that pokemon
              </Link>
            </div>
          </>
        )}
      </div>

      <p className={styles["display-date"]}>{localDate}</p>
    </header>
  );
}
