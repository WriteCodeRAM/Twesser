import { useState, useEffect } from "react";
import { socket } from "../socket";

interface Member {
  id: string;
  name: string;
}

export const useGetMembers = (code: string) => {
  const [members, setMembers] = useState<Member[]>([]);

  useEffect(() => {
    console.log(`Fetching members for room: ${code}`);
    if (code) {
      // Ensure code is not empty
      socket.emit("get_members", code);

      socket.on("members_list", (newMembers) => {
        setMembers(newMembers);
      });
      socket.on("update_room", (newMembers) => {
        setMembers(newMembers);
      });
      return () => {
        socket.off("members_list");
      };
    }
  }, [code]);

  return { members };
};
