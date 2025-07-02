import styles from "@/styles/pages/login.module.css";
import { useState } from "react";

const userList = [
  { user: "a", pass: "b" },
  { user: "testUser", pass: "testPass" },
];

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const foundUser = userList.find(({ user }) => user === username);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (foundUser) {
      if (foundUser.pass === password) {
        alert("welcome, " + username);
        location.reload();
      } else {
        setErrorMessage("username and password do not match");
      }
    } else {
      setErrorMessage("username not found");
    }
  };

  const handleGuestLogin = () => {
    alert("welcome, guest");
    location.reload();
  };

  return (
    <div className={styles["form-wrapper"]}>
      <form className={styles["login-form"]} onSubmit={handleSubmit}>
        <div className={styles["logo-phone"]}>
          <h1>pokédex</h1>

          <img src="/pokeball.png" alt="" />
        </div>

        <h1 className={styles["login-text"]}>Login</h1>

        <div className={styles.inputs}>
          <input
            type="text"
            name="username"
            className="username"
            placeholder="username"
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <input
            type="password"
            name="password"
            className="password"
            placeholder="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <span className={styles.error}>{errorMessage}</span>
        </div>

        <div className={styles.buttons}>
          <button type="submit" className={styles["user-login"]}>
            log in
          </button>
          <button
            type="button"
            className={styles["guest-login"]}
            onClick={handleGuestLogin}
          >
            join as guest
          </button>
        </div>
      </form>
    </div>
  );
}
