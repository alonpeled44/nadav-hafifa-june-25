import Link from "next/link";
import styles from "@/styles/pages/home.module.css";

export default function Home() {
  return (
    <div className={styles["home-page-wrapper"]}>
      Hello Worldasdfasdf
      <Link href="/login">bruhbruhfb</Link>
    </div>
  );
}
