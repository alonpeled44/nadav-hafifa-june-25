import { useState, useContext } from "react";
import pokemons from "@/lib/pokemons";
import types from "@/lib/types";
import sortOptions from "@/lib/sortOptions";
import { WindowWidthContext } from "@/context/WindowWidthContext";
import Dropdown from "@/components/Dropdown";
import Card from "@/components/Card";
import CardPopup from "@/components/CardPopup";
import styles from "@/styles/pages/home.module.css";

export default function Home() {
  const [currentPokemon, setCurrentPokemon] = useState({});

  const { windowWidth, setWindowWidth } = useContext(WindowWidthContext);

  const handleClose = () => {
    setCurrentPokemon({});
  };

  return (
    <div className={styles["home-page-wrapper"]}>
      <div className={styles["search-and-filters"]}>
        {windowWidth > 1200 && (
          <input
            className={styles.search}
            type="search"
            placeholder="🔎 search..."
          />
        )}
        <div className={styles["filter-and-sort"]}>
          <Dropdown
            placeholder="filter"
            arr={types}
            option={<input type="checkbox" />}
          />
          <Dropdown placeholder="sort by" arr={sortOptions} />
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
            {windowWidth > 1200 && (
              <span
                onClick={handleClose}
                className={styles["darken-background-on-popup"]}
              />
            )}
            <CardPopup pokemon={currentPokemon} handleClose={handleClose} />
          </>
        )}
      </div>
    </div>
  );
}
