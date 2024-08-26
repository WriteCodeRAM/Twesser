import io from "socket.io-client";

const socket = io(
  process.env.NODE_ENV === "production"
    ? "https://twesser.onrender.com"
    : "http://localhost:10000",
);

export default socket;
