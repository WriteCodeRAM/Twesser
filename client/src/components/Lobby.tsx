import { SocketOptions } from "socket.io-client";
import { useEffect } from "react";

interface LobbyProps {
  socket: any;
  username: string;
  room: string;
}

function Lobby({ socket, username, room }: LobbyProps) {
  socket.emit("get_members", { room });

  useEffect(() => {
    socket.on("get_members", (members: any) => {
      console.log("test");
    });
  }, []);
  return <div className="bg-white">Lobby</div>;
}
export default Lobby;
