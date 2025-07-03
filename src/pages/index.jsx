import { useEffect } from "react";
import Link from "next/link";
import styles from "@/styles/pages/home.module.css";

export default function Home() {
  useEffect(() => {
    if (!localStorage.getItem("currentUser")) {
      window.location.href = "/login";
    }
  }, []);

  return (
    <div className={styles["home-page-wrapper"]}>
      Hello Worldasdfasdf
      <Link href="/login">bruhbruhfb</Link>
    </div>
  );
}
