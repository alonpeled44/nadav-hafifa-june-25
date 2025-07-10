import Link from "next/link";
import Card from "@/components/Card";
import styles from "@/styles/pages/home.module.css";

export default function Home() {
  return (
    <div className={styles["home-page-wrapper"]}>
      <Card />
      <Link href="/login">amoongus</Link>
    </div>
  );
}
