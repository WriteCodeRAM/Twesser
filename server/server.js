const express = require("express");
const { createServer } = require("http");
const setupSocket = require("./sockets");
const PORT = process.env.PORT || 8080;

const app = express();
const httpServer = createServer(app);

const path = require("path");
app.use(express.static(path.join(__dirname, "../client/out")));

setupSocket(httpServer);

httpServer.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
