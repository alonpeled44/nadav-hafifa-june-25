import styles from "@/styles/components/button.module.css";

export default function Button({ type, text, onClick }) {
  return (
    <button type={type} className={styles.button} onClick={onClick}>
      {text}
    </button>
  );
}
