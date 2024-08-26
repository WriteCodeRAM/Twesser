const express = require("express");
const { createServer } = require("http");
const path = require("path");
const fs = require("fs");
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
  const staticPath = path.join(__dirname, "../client/out");
  console.log(`Checking static path: ${staticPath}`);

  if (fs.existsSync(staticPath)) {
    console.log(`Static path exists, contents:`, fs.readdirSync(staticPath));
    app.use(express.static(staticPath));

    app.get("*", (req, res) => {
      const indexPath = path.join(staticPath, "index.html");
      console.log(`Attempting to serve index.html from: ${indexPath}`);

      if (fs.existsSync(indexPath)) {
        res.sendFile(indexPath);
      } else {
        console.error(`index.html not found at: ${indexPath}`);
        res.status(404).send("index.html not found");
      }
    });
  } else {
    console.error(`Static path does not exist: ${staticPath}`);
    app.use((req, res) => {
      res.status(500).send("Static files not found. Build may have failed.");
    });
  }
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

process.on("uncaughtException", (error) => {
  console.error("Uncaught Exception:", error);
});

process.on("unhandledRejection", (reason, promise) => {
  console.error("Unhandled Rejection at:", promise, "reason:", reason);
});

process.on("SIGTERM", () => {
  console.log("SIGTERM received. Shutting down gracefully.");
  httpServer.close(() => {
    console.log("Server closed.");
    process.exit(0);
  });
});
