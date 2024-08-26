const express = require("express");
const { createServer } = require("http");
const path = require("path");
const setupSocket = require("./sockets");
const PORT = process.env.PORT || 8080;

const app = express();
const httpServer = createServer(app);

if (process.env.NODE_ENV === "production") {
  // serve static files from the Next.js build output directory
  app.use(express.static(path.join(__dirname, "../client/out")));

  // handle requests for any routes not handled by static files
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../client/out/index.html"));
  });
} else {
  app.get("/", (req, res) => {
    res.send("Server is running in development mode");
  });
}

setupSocket(httpServer);

httpServer.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
