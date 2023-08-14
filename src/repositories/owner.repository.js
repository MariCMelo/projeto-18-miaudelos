import { db } from "../database/database.connection.js";

export function getCatByUserId(userId) {
   
  return db.query(`SELECT * FROM cats WHERE "userId" = $1`, [userId]);
}

export function switchStatus(id) {
  return db.query(`UPDATE cats SET status = NOT status  WHERE id = $1`, [id]);
}


