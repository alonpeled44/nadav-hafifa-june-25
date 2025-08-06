import sqlite3 from "sqlite3";
import { User } from "@/pages/api/users";

const db = new sqlite3.Database("users.db");

export function getUsers(): Promise<User[]> {
  return new Promise((resolve, reject) => {
    db.all("SELECT * FROM users", (err, rows: User[]) => {
      if (err) return reject(err);
      resolve(rows);
    });
  });
}

export function setDatabaseTheme(
  theme: string,
  currentUser: string
): Promise<void> {
  return new Promise((resolve, reject) => {
    db.run(
      "UPDATE users SET theme = ? WHERE username = ?",
      [theme, currentUser],
      function (err) {
        if (err) {
          console.error(err.message);
          reject(err);
        } else {
          resolve();
        }
      }
    );
  });
}

export function setDatabaseFontSize(
  fontSize: string,
  currentUser: string
): Promise<void> {
  return new Promise((resolve, reject) => {
    db.run(
      "UPDATE users SET fontSize = ? WHERE username = ?",
      [fontSize, currentUser],
      function (err) {
        if (err) {
          console.error(err.message);
          reject(err);
        } else {
          resolve();
        }
      }
    );
  });
}

export function getUserSettings(
  currentUser: string
): Promise<{ theme: string; fontSize: string }> {
  return new Promise((resolve, reject) => {
    db.get(
      "SELECT theme, fontSize FROM users WHERE username = ?",
      [currentUser],
      (err, row: { theme: string; fontSize: string }) => {
        if (err) return reject(err);
        if (!row) return reject(new Error("User not found"));
        resolve(row);
      }
    );
  });
}

getUsers()
  .then((users) => {})
  .catch((error) => {
    console.error("Error fetching users:", error);
  });
