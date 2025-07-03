import styles from "@/styles/components/header.module.css";

export default function Header() {
  const now = new Date();
  const localDate = now.toLocaleDateString("en-UK");

  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <img src="/pokeball.png" />
        <h1>pokémon</h1>
      </div>

      <p className={styles["display-date"]}>{localDate}</p>
    </header>
  );
}
