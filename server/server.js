const express = require("express");
const { createServer } = require("http");
const path = require("path");
const next = require("next");
const setupSocket = require("./sockets");

const PORT = process.env.PORT || 10000;
const PRODUCTION_URL = "https://twesser.onrender.com";
const dev = process.env.NODE_ENV !== "production";
const nextApp = next({ dev, dir: path.join(__dirname, "../client") });
const handle = nextApp.getRequestHandler();

nextApp.prepare().then(() => {
  const app = express();
  const httpServer = createServer(app);

  app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
    next();
  });

  app.get("/health", (req, res) => {
    console.log("Health check requested");
    res.status(200).send("OK");
  });

  console.log(`Server starting up - ${new Date().toISOString()}`);
  console.log(`Node environment: ${process.env.NODE_ENV}`);
  console.log(`Current directory: ${__dirname}`);

  app.all("*", (req, res) => {
    return handle(req, res);
  });

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
});

process.on("uncaughtException", (error) => {
  console.error("Uncaught Exception:", error);
});

process.on("unhandledRejection", (reason, promise) => {
  console.error("Unhandled Rejection at:", promise, "reason:", reason);
});
