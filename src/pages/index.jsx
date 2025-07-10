import Link from "next/link";
import styles from "@/styles/pages/home.module.css";

export default function Home() {
  return (
    <div className={styles["home-page-wrapper"]}>
      placeholder just to spite lior
      <Link href="/login">amoongus</Link>
    </div>
  );
}
