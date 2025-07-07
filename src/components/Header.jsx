import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { usePathname } from "next/navigation";
import Button from "@/components/Button";
import styles from "@/styles/components/header.module.css";

export default function Header() {
  const [displayName, setDisplayName] = useState("");

  const router = useRouter();

  const pathname = usePathname();

  const now = new Date();
  const localDate = now.toLocaleDateString("en-UK");

  useEffect(() => {
    const user = localStorage.getItem("currentUser");
    if (!user) {
      router.push("/login");
    } else if (user === "!") {
      setDisplayName("guest");
    } else {
      setDisplayName(user);
    }
  }, [pathname]);

  return (
    <header className={styles.header}>
      <div className={styles["header-left"]}>
        {/*change name? */}
        <div className={styles.logo}>
          <img src="/pokeball.png" />
          <h1>pokémon</h1>
        </div>
        {displayName && (
          <>
            <span> | </span>

            <div className={styles["username-and-logout"]}>
              <p>{displayName}</p>
              <Button text="sign out" />
            </div>
          </>
        )}
      </div>

      <p className={styles["display-date"]}>{localDate}</p>
    </header>
  );
}
