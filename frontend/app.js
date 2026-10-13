require("dotenv").config();
const mysql = require("mysql2/promise");
const express = require("express");
const dbConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: Number(process.env.DB_PORT || 3306)
};

const pool = mysql.createPool(dbConfig);
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get("/", (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>AWS 3-Tier DevOps Project</title>
      </head>
      <body>
        <h1>AWS 3-Tier Cloud Application</h1>
        <p>Node.js application is running successfully.</p>
        <p>Project: AWS, Docker, Nginx, RDS and Jenkins.</p>
      </body>
    </html>
  `);
});

app.get("/health", (req, res) => {
  res.json({ status: "UP" });
});

app.get("/db-test", async (req, res) => {
  try {
    const [rows] = await pool.query(
      "SELECT status, created_at FROM app_status ORDER BY id DESC LIMIT 1"
    );

    res.json({ database: "connected", rows });
  } catch (error) {
    console.error("Database query failed:", error.message);
    res.status(500).json({ database: "error" });
  }
});
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Application running on port ${PORT}`);
});
