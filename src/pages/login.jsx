import styles from "@/styles/pages/login.module.css";
export default function Login() {
  return (
    <div className={styles["form-wrapper"]}>
      <form className={styles["login-form"]}>
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
          />

          <input
            type="password"
            name="password"
            className="password"
            placeholder="password"
            required
          />

          <span className={styles.error}></span>
        </div>

        <div className={styles.buttons}>
          <button type="submit" className={styles["user-login"]}>
            log in
          </button>
          <button type="submit" className={styles["guest-login"]}>
            join as guest
          </button>
        </div>
      </form>
    </div>
  );
}
