import pokemons from "@/lib/pokemons";
import styles from "@/styles/components/card.module.css";
export default function Card() {
  return (
    <div className={styles["card-wrapper"]}>
      <div className={styles["name-and-number"]}>
        <p>nigg</p>
        <span>{pokemons.length}</span>
      </div>

      <img className={styles["pokemon-img"]} src="/yellowAmogusBack.png" />

      <div className={styles["pokemon-data"]}>
        <p>type: {pokemons[0].type}</p>
        <p>weight: {pokemons[0].weight}</p>
        <p>height: {pokemons[0].height}</p>
      </div>
    </div>
  );
}
