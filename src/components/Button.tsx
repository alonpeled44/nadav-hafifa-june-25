import styles from "@/styles/components/button.module.css";

type ButtonProps = {
  type?: "button" | "submit" | "reset";
  text: string;
  onClick?: () => void;
};

export default function Button({
  type = "button",
  text,
  onClick,
}: ButtonProps) {
  return (
    <button type={type} className={styles.button} onClick={onClick}>
      {text}
    </button>
  );
}
