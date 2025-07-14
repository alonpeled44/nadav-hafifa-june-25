import styles from "@/styles/components/card-popup.module.css";

export default function CardPopup({ pokemon, handleClose }) {
  return (
    <div className={styles["card-popup-wrapper"]}>
      <div className={styles["name-shiny-id-and-close"]}>
        <h1 className={styles.name}>{pokemon.name}</h1>

        <div className={styles["shiny-id-and-close"]}>
          <label>
            <input type="checkbox" name="isShiny" />{" "}
            {/*probably wanna make the checkbox larger and less aids*/}
            Shiny
          </label>

          <span className={styles.id}>#{pokemon.id}</span>

          <img
            className={styles.close}
            onClick={handleClose}
            src="/x-icon.png"
          />
        </div>
      </div>

      <div className={styles.imgs}>
        <img src="/yellowAmogusFront.png" alt="" />
        <img src="/yellowAmogusBack.png" alt="" />
      </div>

      <div className={styles["pokemon-data"]}>
        <p>
          type:{" "}
          {Array.isArray(pokemon.type) ? pokemon.type.join(", ") : "unknown"}
        </p>
        <p>weight: {pokemon.weight}</p>
        <p>height: {pokemon.height}</p>
      </div>
    </div>
  );
}
