import { useContext } from "react";
import { WindowWidthContext } from "@/context/WindowWidthContext";
import styles from "@/styles/components/card.module.css";

export default function Card({ pokemon, onClick }) {
  const { windowWidth, setWindowWidth } = useContext(WindowWidthContext);

  return (
    <div className={styles["card-wrapper"]} onClick={onClick}>
      {windowWidth > 1200 && (
        <div className={styles["name-and-number"]}>
          <p>{pokemon.name}</p>
          <span>{pokemon.id}</span>
        </div>
      )}

      <img className={styles["pokemon-img"]} src="/yellowAmogusBack.png" />

      {windowWidth > 1200 && (
        <div className={styles["pokemon-data"]}>
          <p>type: {pokemon.type.join(", ")}</p>
          <p>weight: {pokemon.weight}</p>
          <p>height: {pokemon.height}</p>
        </div>
      )}

      {windowWidth <= 1200 && (
        <p className={styles["mobile-name"]}>{pokemon.name}</p>
      )}
    </div>
  );
}
