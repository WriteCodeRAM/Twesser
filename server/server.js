const express = require("express");
const { createServer } = require("http");
const path = require("path");
const setupSocket = require("./sockets");

const PORT = process.env.PORT || 10000;
const PRODUCTION_URL = "https://twesser.onrender.com";
const app = express();
const httpServer = createServer(app);

app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  next();
});

app.get("/", (req, res) => {
  console.log("Root route accessed");
  res.send("Server is running, server is working correctly.");
});

app.get("/health", (req, res) => {
  console.log("Health check requested");
  res.status(200).send("OK");
});

console.log(`Server starting up - ${new Date().toISOString()}`);
console.log(`Node environment: ${process.env.NODE_ENV}`);
console.log(`Current directory: ${__dirname}`);

if (process.env.NODE_ENV === "production") {
  const staticPath = path.join(__dirname, "../client/.next");
  console.log(`Serving static files from: ${staticPath}`);
  app.use(express.static(staticPath));

  app.get("*", (req, res) => {
    const indexPath = path.join(__dirname, "../client/.next/index.html");
    console.log(`Serving index.html for: ${req.url}`);
    res.sendFile(indexPath);
  });
} else {
  console.log("Running in development mode");
  app.get("/", (req, res) => {
    res.send("Server is running in development mode");
  });
}

setupSocket(httpServer);

httpServer.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
  console.log(
    `Full server URL: ${
      process.env.NODE_ENV === "production"
        ? PRODUCTION_URL
        : `http://localhost:${PORT}`
    }`
  );
});
