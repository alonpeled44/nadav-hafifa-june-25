import styles from "@/styles/components/card-popup.module.css";

export default function CardPopup() {
  return (
    <div className={styles["card-popup-wrapper"]}>
      <div className={styles["name-shiny-and-id"]}>
        <h1 className={styles.name}>name lol</h1>

        <div className={styles["shiny-and-id"]}>
          <label>
            <input type="checkbox" name="isShiny" />{" "}
            {/*probably wanna make the checkbox larger and less aids*/}
            Shiny
          </label>

          <span className={styles.id}>#69</span>
        </div>
      </div>

      <div className={styles.imgs}>
        <img src="/yellowAmogusFront.png" alt="" />
        <img src="/yellowAmogusBack.png" alt="" />
      </div>

      <div className={styles["pokemon-data"]}>
        <p>type: type lol</p>
        <p>weight: weight lol</p>
        <p>height: height lol</p>
      </div>
    </div>
  );
}
