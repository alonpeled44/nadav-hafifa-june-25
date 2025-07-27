import { useContext } from "react";
import { WindowWidthContext } from "@/context/WindowWidthContext";
import styles from "@/styles/components/card.module.css";

export default function Card({ digimon, onClick }) {
  const { windowWidth, setWindowWidth } = useContext(WindowWidthContext);

  return (
    <div className={styles["card-wrapper"]} onClick={onClick}>
      {windowWidth > 1200 && (
        <div className={styles["name-and-number"]}>
          <p>{digimon.name}</p>
          <p>{digimon.id}</p>
        </div>
      )}

      <img className={styles["pokemon-img"]} src={digimon.images[0].href} />

      {windowWidth > 1200 && (
        <div className={styles["pokemon-data"]}>
          <p>
            type:
            {digimon.types.map((types) => types.type).join(", ")}
          </p>
          <p>
            level:
            {digimon.levels.map((levels) => levels.level).join(", ")}
          </p>
        </div>
      )}

      {windowWidth <= 1200 && (
        <p className={styles["mobile-name"]}>{digimon.name}</p>
      )}
    </div>
  );
}
