import React, { useState, useEffect, useMemo, useContext } from "react";
import { Digimon } from "@/types/Digimon";
import sortOptions from "@/lib/sortOptions";
import { WindowWidthContext } from "@/context/WindowWidthContext";
import Dropdown from "@/components/Dropdown";
import Card from "@/components/Card";
import CardPopup from "@/components/CardPopup";
import { fetchDigimon } from "@/pages/api/digimonAPI";
import { fetchTypes } from "@/pages/api/types";
import styles from "@/styles/pages/home.module.css";

export default function Home() {
  const dummyDigimon: Digimon = {
    id: 0,
    name: "dummy",
    images: [{ href: "", transparent: false }],
    levels: [{ id: 0, level: "dummy" }],
    types: [{ id: 0, type: "dummy" }],
  };

  const [currentDigimon, setCurrentDigimon] = useState<Digimon>(dummyDigimon);
  const [isFilterOpen, setIsFilterOpen] = useState<boolean>(false);
  const [filterSelected, setFilterSelected] = useState<string[]>([]);
  const [sortSelected, setSortSelected] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [digimons, setDigimons] = useState<Digimon[]>([]);
  const [types, setTypes] = useState<string[]>([]);

  const handleFilter = () => {
    setIsFilterOpen(!isFilterOpen);
  };

  const { windowWidth, setWindowWidth } = useContext(WindowWidthContext);

  const displayDigimons = 50;

  const handleSortSelect = (selectedOption: "id" | "alphabetic") => {
    setSortSelected(selectedOption);
  };
  const handleClose = () => {
    setCurrentDigimon(dummyDigimon);
  };

  const handleCheckbox = (event: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = event.target.checked;
    const value = event.target.value;
    if (isChecked) {
      setFilterSelected([...filterSelected, value]);
    } else {
      setFilterSelected(filterSelected.filter((item) => item !== value));
    }
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
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

          default:
            return 0;
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

  let isDataLoadded = false;

  useEffect(() => {
    if (!isDataLoadded) {
      loadData();
      isDataLoadded = true;
    }
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
          <Dropdown placeholder="filter">
            <div className={styles["dropdown-wrapper"]}>
              {types.map((option) => (
                <label className={styles.option} key={option}>
                  <input
                    type="checkbox"
                    value={option}
                    onChange={handleCheckbox}
                    checked={filterSelected.includes(option)}
                  />

                  {option}
                </label>
              ))}
            </div>
          </Dropdown>
          <Dropdown placeholder="sort by">
            <div className={styles["dropdown-wrapper"]}>
              {sortOptions.map((option) => (
                <label
                  className={styles["select-option"]}
                  key={option}
                  onClick={() => handleSortSelect(option)}
                >
                  {option}
                </label>
              ))}
            </div>
          </Dropdown>
        </div>
      </div>

      <div className={styles["card-grid"]}>
        {cardGrid}

        {currentDigimon.id !== 0 && (
          <>
            {windowWidth > 1200 && (
              <span
                onClick={handleClose}
                className={styles["darken-background-on-popup"]}
              />
            )}
            <CardPopup digimon={currentDigimon} handleClose={handleClose} />
          </>
        )}
      </div>
    </div>
  );
}
