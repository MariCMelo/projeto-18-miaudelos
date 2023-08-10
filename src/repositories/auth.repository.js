import { db } from "../database/database.connection.js";

export function getUser(email) {
  return db.query(`SELECT * FROM users WHERE email=$1;`, [email]);
}

export function createUserDB(name, cpf, phone, email, password) {
  return db.query(
    `INSERT INTO users (name, cpf, phone, email, password)
VALUES ($1, $2, $3, $4, $5)
`,
    [name, cpf, phone, email, password]
  );
}