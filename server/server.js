const express = require("express");
const { createServer } = require("http");
const setupSocket = require("./sockets");
const PORT = 8080;

const app = express();
const httpServer = createServer(app);

setupSocket(httpServer);

httpServer.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
