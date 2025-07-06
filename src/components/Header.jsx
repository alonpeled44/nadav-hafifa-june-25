import styles from "@/styles/components/header.module.css";

export default function Header() {
  const now = new Date();
  const localDate = now.toLocaleDateString("en-UK");

  let displayName = "";
  if (localStorage.getItem("currentUser") === "!") {
    displayName = "guest";
  } else {
    displayName = localStorage.getItem("currentUser");
  }

  return (
    <header className={styles.header}>
      <div className={styles["header-left-part"]}>
        <div className={styles.logo}>
          <img src="/pokeball.png" />
          <h1>pokémon</h1>
        </div>

        {localStorage.getItem("currentUser") && <span> | </span>}
        {localStorage.getItem("currentUser") && (
          <div className={styles["username-and-logout"]}>
            <p>{displayName}</p>
            <button className={styles.logout}> sign out </button>
          </div>
        )}
      </div>

      <p className={styles["display-date"]}>{localDate}</p>
    </header>
  );
}
