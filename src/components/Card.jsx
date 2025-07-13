import styles from "@/styles/components/card.module.css";
export default function Card({ pokemon }) {
  return (
    <div className={styles["card-wrapper"]}>
      <div className={styles["name-and-number"]}>
        <p>{pokemon.name}</p>
        <span>{pokemon.id}</span>
      </div>

      <img className={styles["pokemon-img"]} src="/yellowAmogusBack.png" />

      <div className={styles["pokemon-data"]}>
        <p>type: {pokemon.type.join(", ")}</p>
        <p>weight: {pokemon.weight}</p>
        <p>height: {pokemon.height}</p>
      </div>
    </div>
  );
}
