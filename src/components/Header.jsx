import styles from "@/styles/components/header.module.css";

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <img src="/pokeball.png" />
        <h1>pokémon</h1>
      </div>

      <p className={styles["display-date"]}></p>
    </header>
  );
}
