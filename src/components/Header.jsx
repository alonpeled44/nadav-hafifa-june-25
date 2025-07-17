import { useState, useContext } from "react";
import { useRouter } from "next/router";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { DisplayNameContext } from "@/context/DisplayNameContext";
import { WindowWidthContext } from "@/context/WindowWidthContext";
import Button from "@/components/Button";
import HorizontalDivider from "@/components/HorizontalDivider";
import styles from "@/styles/components/header.module.css";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const { displayName, setDisplayName } = useContext(DisplayNameContext);
  const { windowWidth, setWindowWidth } = useContext(WindowWidthContext);

  const localDate = new Date().toLocaleDateString("en-UK");

  const router = useRouter();

  const pathname = usePathname();

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    router.push("/login");
    setDisplayName("");
  };

  const handleOverlay = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className={styles.header}>
      {windowWidth <= 1200 && pathname !== "/login" && (
        <>
          <img
            className={styles["overlay-icon"]}
            onClick={handleOverlay}
            src={isOpen ? "/x-icon.png" : "/3-lines-icon.png"}
          />

          <nav
            className={`${styles.overlay} ${
              isOpen ? styles["overlay-open"] : ""
            }`}
          >
            <Link className={styles["overlay-link"]} href="/">
              pokédex
            </Link>
          </nav>
        </>
      )}

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

            {windowWidth > 1200 && (
              <div className={styles.links}>
                <Link className={styles["header-link"]} href="/">
                  pokédex
                </Link>
              </div>
            )}
          </>
        )}
      </div>

      {windowWidth > 1200 && (
        <p className={styles["display-date"]}>{localDate}</p>
      )}
    </header>
  );
}
