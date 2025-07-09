import { useState, useEffect, useContext } from "react";
import { DisplayNameContext } from "@/context/DisplayNameContext";
import Link from "next/link";
import Button from "@/components/Button";
import styles from "@/styles/pages/guess-pokemon.module.css";

export default function GuessPokemon() {
  const [windowWidth, setWindowWidth] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  const { displayName } = useContext(DisplayNameContext);

  const handleOverlay = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    setWindowWidth(window.innerWidth);
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className={styles["guess-pokemon-wrapper"]}>
      {windowWidth <= 1200 && (
        <div className={styles["mobile-title"]}>
          <button
            type="button"
            onClick={handleOverlay}
            className={styles["overlay-button"]}
          >
            {isOpen ? "x" : "Σ"}
          </button>
          <nav
            className={`${styles.overlay} ${isOpen ? styles.overlayOpen : ""}`}
          >
            <Link className={styles["overlay-link"]} href="/">
              pokédex
            </Link>
            <Link className={styles["overlay-link"]} href="/guess-pokemon">
              guess that pokemon
            </Link>
          </nav>

          <div className={styles.logo}>
            <h1>pokédex</h1>
            <img src="/pokeball.png" />
          </div>

          <div className={styles["username-and-logout"]}>
            <p>{displayName}</p>
            <Button text="sign out" />
          </div>
        </div>
      )}
      <p className={styles.p}>guess that pokemon page lol lmao</p>
    </div>
  );
}
