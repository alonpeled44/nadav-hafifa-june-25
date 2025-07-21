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
  const [filterSelected, setFilterSelected] = useState([]);
  const [sortSelected, setSortSelected] = useState("");

  const { windowWidth, setWindowWidth } = useContext(WindowWidthContext);

  const handleSortSelect = (selectedOption) => {
    setSortSelected(selectedOption);
  };
  const handleClose = () => {
    setCurrentPokemon({});
  };

  const handleCheckbox = (event) => {
    const isChecked = event.target.checked;
    const value = event.target.value;
    if (isChecked) {
      setFilterSelected([...filterSelected, value]);
    } else {
      setFilterSelected(filterSelected.filter((item) => item !== value));
    }
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
            options={types}
            selectedOptions={filterSelected}
            isCheckbox={true}
            onChange={handleCheckbox}
          />
          <Dropdown
            placeholder="sort by"
            options={sortOptions}
            selectedOptions={filterSelected}
            handleSelect={handleSortSelect}
          />
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
            <CardPopup
              className={styles.popup}
              pokemon={currentPokemon}
              handleClose={handleClose}
            />
          </>
        )}
      </div>
    </div>
  );
}
