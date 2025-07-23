import { useState, useEffect, useMemo, useContext } from "react";
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

  const showbruh = () => {
    console.log("sortselected: ", sortSelected);
  };

  const filteredPokemons = useMemo(() => {
    let result = pokemons;

    if (filterSelected.length > 0) {
      result = result.filter((pokemon) =>
        pokemon.type.some((type) => filterSelected.includes(type))
      );
    }

    if (sortSelected) {
      result = [...result];

      switch (sortSelected) {
        case "id":
          result.sort((a, b) => a.id - b.id);
          break;

        case "alphabetic":
          result.sort((a, b) => a.name.localeCompare(b.name));
          break;

        case "height":
          result.sort((a, b) => a.height - b.height);
          break;

        case "weight":
          result.sort((a, b) => a.weight - b.weight);
          break;
      }
    }

    return result;
  }, [filterSelected, sortSelected, pokemons]);

  const cardGrid = useMemo(() => {
    return filteredPokemons.map((pokemon) => (
      <Card key={pokemon.id} pokemon={pokemon} />
    ));
  }, [filteredPokemons]);

  return (
    <div className={styles["home-page-wrapper"]}>
      <button onClick={showbruh}>show bruh</button>
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
            selectedOptions={sortSelected}
            handleSelect={handleSortSelect}
          />
        </div>
      </div>

      <div className={styles["card-grid"]}>
        {cardGrid}

        {Object.keys(currentPokemon).length !== 0 && (
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
