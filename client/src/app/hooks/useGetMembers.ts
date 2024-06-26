import { useState, useEffect } from "react";
import { socket } from "../socket";

interface Member {
  id: string;
  name: string;
  host: boolean;
}

export const useGetMembers = (code: string) => {
  const [members, setMembers] = useState<Member[]>([]);

  useEffect(() => {
    console.log(`Fetching members for room: ${code}`);
    if (code) {
      // runs when user joins room, emits listener to update lobby member list to client
      socket.on("update_room", (newMembers: Member[]) => {
        console.log("running update room");
        console.log(newMembers);
        setMembers(newMembers);
      });
      return () => {
        socket.off("update_room");
      };
    }
  }, [code]);

  return { members };
};
