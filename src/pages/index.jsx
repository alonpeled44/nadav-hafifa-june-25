import { useState, useEffect } from "react";
import Link from "next/link";
import Button from "@/components/Button";
import styles from "@/styles/pages/home.module.css";

export default function Home() {
  const [windowWidth, setWindowWidth] = useState(0);

  useEffect(() => {
    const user = localStorage.getItem("currentUser");
    if (!user) {
      router.push("/login");
    } else if (user === "!") {
      setDisplayName("guest");
    } else {
      setDisplayName(user);
    }
    setWindowWidth(window.innerWidth);

    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className={styles["home-page-wrapper"]}>
      {windowWidth <= 1200 && (
        <div className={styles["phone-title"]}>
          <div className={styles.logo}>
            <h1>pokédex</h1>
            <img src="/pokeball.png" />
          </div>

          <div className={styles["username-and-logout"]}>
            <p>{displayName}</p>
            <Button text="sign out" />
          </div>
        </div>
      )}
      Hello Worldasdfasdf
      <Link href="/login">bruhbruhfb</Link>
    </div>
  );
}
