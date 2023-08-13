import { db } from "../database/database.connection.js";

export function getCats() {
  return db.query(`SELECT * FROM cats;`);
}

export function addCat(name, age, color, breed, photo, status, userId) {
    
  return db.query(
    `INSERT INTO cats (name, age, color, breed, photo, status, userId ) VALUES ($1, $2, $3, $4, $5, $6, $7)`,
    [name, age, color, breed, photo, status, userId]
  );
}

export function getCatById(Id) {
  return db.query(`SELECT * FROM cats WHERE Id = $1`, [Id]);
}