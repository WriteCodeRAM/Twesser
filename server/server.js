const express = require("express");
const { createServer } = require("http");
const setupSocket = require("./sockets");
const PORT = process.env.PORT || 8080;

const app = express();
const httpServer = createServer(app);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/out")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../client/out/index.html"));
  });
}

setupSocket(httpServer);

httpServer.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
