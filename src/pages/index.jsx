import { useState, useEffect, useMemo, useContext } from "react";
import sortOptions from "@/lib/sortOptions";
import { WindowWidthContext } from "@/context/WindowWidthContext";
import Dropdown from "@/components/Dropdown";
import Card from "@/components/Card";
import CardPopup from "@/components/CardPopup";
import { fetchDigimon } from "@/pages/api/digimonAPI";
import { fetchTypes } from "@/pages/api/types";
import styles from "@/styles/pages/home.module.css";

export default function Home() {
  const [currentDigimon, setCurrentDigimon] = useState({});
  const [filterSelected, setFilterSelected] = useState([]);
  const [sortSelected, setSortSelected] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [digimons, setDigimons] = useState([]);
  const [types, setTypes] = useState([]);

  const { windowWidth, setWindowWidth } = useContext(WindowWidthContext);

  const displayDigimons = 50;

  const handleSortSelect = (selectedOption) => {
    setSortSelected(selectedOption);
  };
  const handleClose = () => {
    setCurrentDigimon({});
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

  const handleSearch = (event) => {
    setSearchValue(event.target.value);
  };

  const filteredDigimons = useMemo(() => {
    let result = [...digimons];

    if (filterSelected.length > 0) {
      result = result.filter((digimon) =>
        digimon.types.some((type) => filterSelected.includes(type.type))
      );
    }

    if (sortSelected) {
      result.sort((a, b) => {
        switch (sortSelected) {
          case "id":
            return a.id - b.id;

          case "alphabetic":
            return a.name.localeCompare(b.name);
        }
      });
    }

    if (searchValue) {
      result = result.filter((digimon) =>
        digimon.name.toLowerCase().includes(searchValue.toLowerCase())
      );
    }

    return result;
  }, [filterSelected, sortSelected, searchValue, digimons]);

  const cardGrid = useMemo(() => {
    return filteredDigimons
      .filter(
        (digimon) => digimon.types.length > 0 && digimon.levels.length > 0
      )
      .map((digimon) => (
        <Card
          key={digimon.id}
          digimon={digimon}
          onClick={() => setCurrentDigimon(digimon)}
        />
      ));
  }, [filteredDigimons]);

  async function loadData() {
    for (let i = 0; i < displayDigimons; i++) {
      const digimonData = await fetchDigimon(i + 1);
      setDigimons((prev) => [...prev, digimonData]);
    }

    const typeData = await fetchTypes();
    setTypes([...typeData]);
  }

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div className={styles["home-page-wrapper"]}>
      <div className={styles["search-and-filters"]}>
        {windowWidth > 1200 && (
          <input
            className={styles.search}
            type="search"
            value={searchValue}
            onChange={handleSearch}
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

        {Object.keys(currentDigimon).length !== 0 && (
          <>
            {windowWidth > 1200 && (
              <span
                onClick={handleClose}
                className={styles["darken-background-on-popup"]}
              />
            )}
            <CardPopup
              className={styles.popup}
              digimon={currentDigimon}
              handleClose={handleClose}
            />
          </>
        )}
      </div>
    </div>
  );
}
