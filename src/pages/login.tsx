import { useContext, useState } from "react";
import { useRouter } from "next/router";
import Button from "@/components/Button";
import users from "@/lib/users";
import { WindowWidthContext } from "@/context/WindowWidthContext";
import styles from "@/styles/pages/login.module.css";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const { windowWidth, setWindowWidth } = useContext(WindowWidthContext);

  const router = useRouter();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const foundUser = users.find((user) => user.username === username);

    if (!username.match("^[A-Za-z]+$")) {
      setErrorMessage("username can only include letters");
    } else if (foundUser) {
      if (foundUser.password === password) {
        localStorage.setItem("currentUser", username);
        router.push("/");
      } else {
        setErrorMessage("username and password do not match");
      }
    } else {
      setErrorMessage("username not found");
    }
  };

  const handleGuestLogin = () => {
    router.push("/");
    localStorage.setItem("currentUser", "!");
  };

  return (
    <div className={styles["form-wrapper"]}>
      <form className={styles["login-form"]} onSubmit={handleSubmit}>
        {windowWidth > 1200 && <h1 className={styles["login-text"]}>login</h1>}

        <div className={styles.inputs}>
          <input
            type="text"
            name="username"
            placeholder="username"
            required
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />

          <input
            type="password"
            name="password"
            placeholder="password"
            required
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />

          <span className={styles.error}>{errorMessage}</span>
        </div>

        <div className={styles.buttons}>
          <Button type="submit" text="log in" />

          <Button
            type="button"
            text="join as guest"
            onClick={handleGuestLogin}
          />
        </div>
      </form>
    </div>
  );
}
