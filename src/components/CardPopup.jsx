import { useContext, useEffect, useState } from "react";
import { WindowWidthContext } from "@/context/WindowWidthContext";
import styles from "@/styles/components/card-popup.module.css";

export default function CardPopup({ pokemon, handleClose }) {
  const [isOpen, setIsOpen] = useState(false);

  const { windowWidth, setWindowWidth } = useContext(WindowWidthContext);

  const handleAnimatedClose = () => {
    if (windowWidth <= 1200) {
      setIsOpen(false);
      setTimeout(() => {
        handleClose();
      }, 300);
    } else {
      handleClose();
    }
  };

  useEffect(() => {
    const handleTransition = () => {
      setIsOpen(!isOpen);
    };

    if (!(Object.keys(pokemon).length === 0)) {
      handleTransition();
    }
  }, []);

  return (
    <div
      className={`${styles["card-popup-wrapper"]} ${
        isOpen ? styles["card-popup-open"] : ""
      }`}
    >
      <div className={styles["name-shiny-id-and-close"]}>
        {windowWidth > 1200 && <h1 className={styles.name}>{pokemon.name}</h1>}

        <div className={styles["shiny-id-and-close"]}>
          {windowWidth > 1200 && (
            <div className={styles["shiny-and-id"]}>
              <label>
                <input type="checkbox" name="isShiny" />{" "}
                {/*probably wanna make the checkbox larger and less aids*/}
                Shiny
              </label>

              <span className={styles.id}>#{pokemon.id}</span>
            </div>
          )}

          <img
            className={styles.close}
            onClick={handleAnimatedClose}
            src="/x-icon.png"
          />
        </div>
      </div>

      <div className={styles["imgs-and-data"]}>
        <div className={styles.imgs}>
          <img src="/yellowAmogusFront.png" alt="" />
          <img src="/yellowAmogusBack.png" alt="" />
        </div>

        <div className={styles["pokemon-data"]}>
          {windowWidth <= 1200 && <p>{pokemon.name}</p>}
          <p>
            type:{" "}
            {Array.isArray(pokemon.type) ? pokemon.type.join(", ") : "unknown"}
          </p>
          <p>weight: {pokemon.weight}</p>
          <p>height: {pokemon.height}</p>
        </div>
      </div>
    </div>
  );
}
