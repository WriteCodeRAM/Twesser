import { SocketOptions } from "socket.io-client";

interface LobbyProps {
  socket: SocketOptions;
  username: string;
  room: string;
}

function Lobby({ socket, username, room }: LobbyProps) {
  return <div>Lobby</div>;
}
export default Lobby;
