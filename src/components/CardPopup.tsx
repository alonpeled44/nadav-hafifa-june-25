import { useContext, useEffect, useState } from "react";
import { Digimon } from "@/types/Digimon";
import { WindowWidthContext } from "@/context/WindowWidthContext";
import styles from "@/styles/components/card-popup.module.css";

export type PopupProps = {
  digimon: Digimon;
  handleClose: () => void;
};

export default function CardPopup({ digimon, handleClose }: PopupProps) {
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

    if (Object.keys(digimon).length !== 0) {
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
        {windowWidth > 1200 && <h1 className={styles.name}>{digimon.name}</h1>}

        <div className={styles["shiny-id-and-close"]}>
          {windowWidth > 1200 && (
            <div className={styles["shiny-and-id"]}>
              <label>
                <input type="checkbox" name="isShiny" /> Shiny
              </label>

              <p className={styles.id}>#{digimon.id}</p>
            </div>
          )}

          <img
            className={styles["close-button"]}
            onClick={handleAnimatedClose}
            src="/x-icon.png"
          />
        </div>
      </div>

      <div className={styles["imgs-and-data"]}>
        <div className={styles.imgs}>
          <img src={digimon.images[0].href} />
        </div>

        <div className={styles["pokemon-data"]}>
          {windowWidth <= 1200 && <p>{digimon.name}</p>}
          <p>
            type:
            {digimon.types.map((types) => types.type).join(", ")}
          </p>
          <p>
            level:
            {digimon.levels.map((levels) => levels.level).join(", ")}
          </p>
        </div>
      </div>
    </div>
  );
}
