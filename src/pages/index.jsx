import { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import styles from "@/styles/pages/home.module.css";

export default function Home() {
  const router = useRouter();
  useEffect(() => {
    if (!localStorage.getItem("currentUser")) {
      router.push("/login");
    }
  }, []);

  return (
    <div className={styles["home-page-wrapper"]}>
      Hello Worldasdfasdf
      <Link href="/login">bruhbruhfb</Link>
    </div>
  );
}
