import { useState } from "react";
import pokemons from "@/lib/pokemons";
import Card from "@/components/Card";
import CardPopup from "@/components/CardPopup";
import styles from "@/styles/pages/home.module.css";

export default function Home() {
  const [currentPokemon, setCurrentPokemon] = useState({});

  const handleClickOutside = () => {
    setCurrentPokemon({});
  };

  const handleClose = () => {
    setCurrentPokemon({});
  };

  return (
    <div className={styles["home-page-wrapper"]}>
      <div className={styles["search-and-filters"]}>
        <input
          className={styles.search}
          type="search"
          placeholder="🔎 search..."
        />
        <div className={styles["filter-and-sort"]}>
          <p className={styles.p}>stupid filter will be here</p>

          <select className={styles.sort} name="sort">
            <option value="">sort by</option>
            <option value="byId">id</option>
            <option value="byAlphabet">alphabetically</option>
            <option value="byWeight">weight</option>
            <option value="byHeight">height</option>
          </select>
        </div>
      </div>

      <div className={styles["card-grid"]}>
        {pokemons.map((pokemon, index) => (
          <Card
            key={index}
            pokemon={pokemon}
            onClick={() => setCurrentPokemon(pokemon)}
          />
        ))}

        {!(Object.keys(currentPokemon).length === 0) && (
          <>
            <span
              onClick={handleClickOutside}
              className={styles["darken-background-on-popup"]}
            />
            <CardPopup pokemon={currentPokemon} handleClose={handleClose} />
          </>
        )}
      </div>
    </div>
  );
}
