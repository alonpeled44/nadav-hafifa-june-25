import { useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";
import { usePathname } from "next/navigation";
import Link from "next/link";
import updateTheme from "@/pages/api/updateTheme";
import updateFontSize from "@/pages/api/updateFontSize";
import { DisplayNameContext } from "@/context/DisplayNameContext";
import CircleDropdown from "@/components/CircleDropdown";
import SideMenu from "@/components/SideMenu";
import Modal from "@/components/Modal";
import Button from "@/components/Button";
import HorizontalDivider from "@/components/HorizontalDivider";
import styles from "@/styles/components/header.module.css";
type HeaderProps = {
  selectedTheme: string;
  setSelectedTheme: (theme: string) => void;
};

export default function Header({
  selectedTheme,
  setSelectedTheme,
}: HeaderProps) {
  const [windowWidth, setWindowWidth] = useState(0);
  const [overlayOpen, setOverlayOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
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

  const toggleTheme = () => {
    setSelectedTheme(selectedTheme === "light" ? "dark" : "light");
  };

  const setTheme = async (event: React.MouseEvent<HTMLButtonElement>) => {
    const newTheme = event.currentTarget.value;
    const currentUser = localStorage.getItem("currentUser");
    setSelectedTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    await fetch("/api/updateTheme", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ newTheme, currentUser }),
    });
  };

  const handleFontSize = async (event: React.MouseEvent<HTMLButtonElement>) => {
    const newFontSize = event.currentTarget.value;
    const currentUser = localStorage.getItem("currentUser");

    setSelectedFontSize(newFontSize);
    localStorage.setItem("font", newFontSize);
    await fetch("/api/updateFontSize", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ newFontSize, currentUser }),
    });
  };

  useEffect(() => {
    if (displayName) {
      fetch(`/api/fetchSettings?username=${encodeURIComponent(displayName)}`)
        .then((res) => res.json())
        .then((data) => {
          setSelectedTheme(data.theme);
          setSelectedFontSize(data.fontSize);
        })
        .catch((err) => {
          console.error("Failed to load user settings:", err);
        });
    }

    const root = document.documentElement;

    const primaryColor = `var(--font-size-${selectedFontSize})`;

    const fontSizeVar = `var(--font-size-${selectedFontSize})`;
    root.style.setProperty("--font-size-base", fontSizeVar);

    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [selectedFontSize, selectedTheme, displayName]);

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
              overlayOpen ? styles["overlay-open"] : ""
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
                >
                  <button value="light" onClick={setTheme} />
                  <div className={styles["image-wrapper"]}>
                    <img src="/sun-icon.png" />
                  </div>
                  light
                </label>

                <label
                  className={selectedTheme === "dark" ? styles.selected : ""}
                >
                  <button value="dark" onClick={setTheme} />
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
                  <button value="large" onClick={handleFontSize} />
                  <div className={styles["image-wrapper"]}>
                    <img
                      className={styles["font-size-option-large"]}
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
                  <button value="medium" onClick={handleFontSize} />
                  <div className={styles["image-wrapper"]}>
                    <img
                      className={styles["font-size-option-medium"]}
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
                  <button value="small" onClick={handleFontSize} />
                  <div className={styles["image-wrapper"]}>
                    <img
                      className={styles["font-size-option-small"]}
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
        <CircleDropdown
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
                  className={styles[`font-size-option-${selectedFontSize}`]}
                />
              }
            >
              <div className={styles["mobile-setting-options"]}>
                {selectedFontSize !== "large" && (
                  <label>
                    <button value="large" onClick={handleFontSize} />
                    <div className={styles["image-wrapper"]}>
                      <img
                        className={styles["font-size-option-large"]}
                        src="/font-size-icon.png"
                      />
                    </div>
                  </label>
                )}

                {selectedFontSize !== "medium" && (
                  <label>
                    <button value="medium" onClick={handleFontSize} />
                    <div className={styles["image-wrapper"]}>
                      <img
                        className={styles["font-size-option-medium"]}
                        src="/font-size-icon.png"
                      />
                    </div>
                  </label>
                )}

                {selectedFontSize !== "small" && (
                  <label>
                    <button value="small" onClick={handleFontSize} />
                    <div className={styles["image-wrapper"]}>
                      <img
                        className={styles["font-size-option-small"]}
                        src="/font-size-icon.png"
                      />
                    </div>
                  </label>
                )}
              </div>
            </SideMenu>
          </div>
        </CircleDropdown>
      )}
    </header>
  );
}
