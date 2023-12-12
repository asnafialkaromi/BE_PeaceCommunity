const mysql = require("mysql2/promise");
require("dotenv").config();

const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USERNAME,
  database: process.env.DB_DBNAME,
  password: process.env.DB_PASSWORD, //!sdw%2sdscas.`
  connectionLimit: 10,
  enableKeepAlive: true,
  keepAliveInitialDelay: 0,
});

// query adalah string
// value adalah array query
async function query(query, value) {
  try {
    const [executeQuery] = await db.query(query, value ?? []); // hasil dari query
    return executeQuery;
  } catch (error) {
    console.log(error);
  }
}

module.exports = query;
