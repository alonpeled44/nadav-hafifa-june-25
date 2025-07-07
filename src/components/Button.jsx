import styles from "@/styles/components/button.module.css";

export default function Button(props) {
  return (
    <button type={props.type} className={styles.button}>
      {props.text}
    </button>
  );
}
