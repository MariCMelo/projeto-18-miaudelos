import { db } from "../database/database.connection.js";

export function getUserEmail(email) {
  return db.query(`SELECT * FROM users WHERE email=$1;`, [email]);
}
export function getUserCpf(cpf) {
  return db.query(`SELECT * FROM users WHERE cpf=$1;`, [cpf]);
}

export function getUserId(id) {
  console.log(id)
  return db.query(`SELECT * FROM users WHERE id=$1;`, [id]);
}

export function findSessionDB(token) {
  return db.query(`SELECT "userId" FROM sessions WHERE token=$1;`, [token]);
}

export function createUserDB(name, cpf, phone, email, password) {
  return db.query(
    `INSERT INTO users (name, cpf, phone, email, password)
VALUES ($1, $2, $3, $4, $5)
`,
    [name, cpf, phone, email, password]
  );
}

export function createSession(userId, token) {
  return db.query(`INSERT INTO sessions ("userId", token) VALUES ($1, $2);`, [
    userId,
    token,
  ]);
}
