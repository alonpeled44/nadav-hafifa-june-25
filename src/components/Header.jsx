import styles from "@/styles/components/header.module.css";

export default function Header() {
  const newDate = new Date();
  const currentDate =
    newDate.getDate() +
    "/" +
    (newDate.getMonth() + 1) +
    "/" +
    newDate.getFullYear();

  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <img src="/pokeball.png" />
        <h1>pokémon</h1>
      </div>

      <p className={styles["display-date"]}>{currentDate}</p>
    </header>
  );
}
