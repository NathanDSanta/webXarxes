import mysql from "mysql2";
import dotenv from "dotenv";
dotenv.config();

const pool = mysql
  .createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
  })
  .promise();

export async function getUsers() {
  const [rows] = await pool.query(`
    SELECT * 
    FROM users
    `);
  return rows;
}

export async function getLoggedUser(username) {
  const [rows] = await pool.query(`
    SELECT *
    FROM users
    WHERE username='${username}'
  `);
  return rows[0];
}

export async function getUser(username, password) {
  const [rows] = await pool.query(`
    SELECT *
    FROM users
    WHERE username='${username}' AND password='${password}'
  `);
  return rows[0];
}

export async function getUserPosts(username) {
  const [rows] = await pool.query(`
    SELECT *
    FROM posts
    WHERE username='${username}'
  `);
  return rows;
}

const user = await getUser("admin1", "password123");
console.log(user);

const users = await getUsers();
console.log(users);
