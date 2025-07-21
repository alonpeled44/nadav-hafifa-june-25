import { useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { DisplayNameContext } from "@/context/DisplayNameContext";
import Dropdown from "@/components/Dropdown";
import SideMenu from "@/components/SideMenu";
import Modal from "@/components/Modal";
import Button from "@/components/Button";
import HorizontalDivider from "@/components/HorizontalDivider";
import styles from "@/styles/components/header.module.css";

export default function Header() {
  const [windowWidth, setWindowWidth] = useState(0);
  const [overlayOpen, setOverlayOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [selectedTheme, setSelectedTheme] = useState("light");
  const [selectedFontSize, setSelectedFontSize] = useState("medium");

  const { displayName, setDisplayName } = useContext(DisplayNameContext);

  const localDate = new Date().toLocaleDateString("en-UK");

  const router = useRouter();

  const pathname = usePathname();

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    router.push("/login");
    setDisplayName("");
  };

  const toggleOverlay = () => {
    setOverlayOpen(!overlayOpen);
  };

  const toggleSettings = () => {
    setSettingsOpen(!settingsOpen);
  };

  const toggleTheme = (event) => {
    setSelectedTheme(
      windowWidth >= 1200
        ? event.target.value
        : selectedTheme === "light"
        ? "dark"
        : "light"
    );
  };

  const handleFontSize = (event) => {
    setSelectedFontSize(event.target.value);
  };

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <header className={styles.header}>
      {windowWidth <= 1200 && pathname !== "/login" && (
        <>
          <img
            className={styles["overlay-icon"]}
            onClick={toggleOverlay}
            src={overlayOpen ? "/x-icon.png" : "/3-lines-icon.png"}
          />

          <nav
            className={`${styles.overlay} ${
              overlayOpen ? styles.overlayOpen : ""
            }`}
          >
            <Link className={styles["overlay-link"]} href="/">
              pokédex
            </Link>
          </nav>
        </>
      )}

      <div className={styles["logo-and-user-information"]}>
        <div className={styles.logo}>
          <img src="/pokeball.png" />
          <h1>pokémon</h1>
        </div>
        {displayName && (
          <>
            <div className={styles["horizontal-divider-container"]}>
              <HorizontalDivider />
            </div>

            <div className={styles["username-and-logout"]}>
              <p>{displayName}</p>
              <Button text="sign out" onClick={handleLogout} />
            </div>

            <div className={styles["horizontal-divider-container"]}>
              <HorizontalDivider />
            </div>

            {windowWidth > 1200 && (
              <div className={styles.links}>
                <Link className={styles["header-link"]} href="/">
                  pokédex
                </Link>
              </div>
            )}
          </>
        )}
      </div>

      {windowWidth > 1200 && (
        <div className={styles["date-and-settings"]}>
          <p className={styles.date}>{localDate}</p>

          <img onClick={toggleSettings} src="/settings-icon.png" />
        </div>
      )}

      {windowWidth > 1200 && (
        <Modal isOpen={settingsOpen} onClose={() => setSettingsOpen(false)}>
          <div className={styles["settings-modal"]}>
            <div className={styles.setting}>
              <h1>Theme</h1>
              <div className={styles["setting-options"]}>
                <label
                  className={selectedTheme === "light" ? styles.selected : ""}
                  l
                >
                  <input
                    type="radio"
                    name="theme"
                    value="light"
                    onChange={toggleTheme}
                    checked={selectedFontSize === "light"}
                  />
                  <div className={styles["image-wrapper"]}>
                    <img src="/sun-icon.png" />
                  </div>
                  light
                </label>

                <label
                  className={selectedTheme === "dark" ? styles.selected : ""}
                >
                  <input
                    type="radio"
                    name="theme"
                    value="dark"
                    onChange={toggleTheme}
                    checked={selectedFontSize === "dark"}
                  />
                  <div className={styles["image-wrapper"]}>
                    <img src="/moon-icon.png" />
                  </div>
                  dark
                </label>
              </div>
            </div>

            <div className={styles.setting}>
              <h1>Font size</h1>

              <div className={styles["setting-options"]}>
                <label
                  className={
                    selectedFontSize === "large" ? styles.selected : ""
                  }
                >
                  <input
                    type="radio"
                    name="fontSize"
                    value="large"
                    onChange={handleFontSize}
                    checked={selectedFontSize === "large"}
                  />
                  <div className={styles["image-wrapper"]}>
                    <img
                      className={styles["font-size-large"]}
                      src="/font-size-icon.png"
                    />
                  </div>
                  large
                </label>

                <label
                  className={
                    selectedFontSize === "medium" ? styles.selected : ""
                  }
                >
                  <input
                    type="radio"
                    name="fontSize"
                    value="medium"
                    onChange={handleFontSize}
                    checked={selectedFontSize === "medium"}
                  />
                  <div className={styles["image-wrapper"]}>
                    <img
                      className={styles["font-size-medium"]}
                      src="/font-size-icon.png"
                    />
                  </div>
                  medium
                </label>

                <label
                  className={
                    selectedFontSize === "small" ? styles.selected : ""
                  }
                >
                  <input
                    type="radio"
                    name="fontSize"
                    value="small"
                    onChange={handleFontSize}
                    checked={selectedFontSize === "small"}
                  />
                  <div className={styles["image-wrapper"]}>
                    <img
                      className={styles["font-size-small"]}
                      src="/font-size-icon.png"
                    />
                  </div>
                  small
                </label>
              </div>
            </div>
          </div>
        </Modal>
      )}

      {windowWidth <= 1200 && (
        <Dropdown
          placeholder={
            <img
              className={styles["dropdown-settings-icon"]}
              src="/settings-icon.png"
            />
          }
        >
          <div className={styles["settings-dropdown-content-wrapper"]}>
            <img
              className={styles["mobile-theme-toggle"]}
              src={
                selectedTheme === "light" ? "/sun-icon.png" : "/moon-icon.png"
              }
              onClick={toggleTheme}
            />

            <SideMenu
              placeholder={
                <img
                  src="/font-size-icon.png"
                  className={
                    selectedFontSize === "large"
                      ? styles["font-size-large"]
                      : styles["font-size-small"]
                  }
                />
              }
            >
              <div className={styles["mobile-setting-options"]}>
                <label>
                  <input
                    type="radio"
                    name="fontSize"
                    value="large"
                    onChange={handleFontSize}
                    checked={selectedFontSize === "large"}
                  />
                  <div className={styles["image-wrapper"]}>
                    <img
                      className={styles["font-size-large"]}
                      src="/font-size-icon.png"
                    />
                  </div>
                </label>

                <label>
                  <input
                    type="radio"
                    name="fontSize"
                    value="small"
                    onChange={handleFontSize}
                    checked={selectedFontSize === "small"}
                  />
                  <div className={styles["image-wrapper"]}>
                    <img
                      className={styles["font-size-small"]}
                      src="/font-size-icon.png"
                    />
                  </div>
                </label>
              </div>
            </SideMenu>
          </div>
        </Dropdown>
      )}
    </header>
  );
}
