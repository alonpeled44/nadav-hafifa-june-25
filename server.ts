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

getUsers()
  .then((users) => {
    console.log("Users:", users);
  })
  .catch((error) => {
    console.error("Error fetching users:", error);
  });
