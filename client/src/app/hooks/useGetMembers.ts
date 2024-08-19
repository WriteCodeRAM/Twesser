import { useState, useEffect } from "react";
import { socket } from "../socket";
import { useSoundEffects } from "./useSoundEffects";

interface Member {
  id: string;
  name: string;
  host: boolean;
}

export const useGetMembers = (code: string) => {
  const [members, setMembers] = useState<Member[]>([]);
  const { playLeftSound, playJoinedSound } = useSoundEffects();

  useEffect(() => {
    if (code) {
      socket.on("update_room", (newMembers: Member[]) => {
        if (newMembers.length > members.length) {
          playJoinedSound();
        }
        setMembers(newMembers);
      });

      socket.on(
        "member_disconnected",
        (disconnectedId: string, newMembers: Member[]) => {
          playLeftSound();
          setMembers(newMembers);
        },
      );

      return () => {
        socket.off("update_room");
        socket.off("member_disconnected");
      };
    }
  }, [code, members.length]);

  return { members };
};
