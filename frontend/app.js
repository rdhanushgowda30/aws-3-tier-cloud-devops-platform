const express = require("express");

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

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Application running on port ${PORT}`);
});
