import React from "react";
import { LobbyMembersProps } from "@/types";

const textColors = ["text-gold", "text-platinum", "text-bronze"];
const borderColors = ["border-gold", "border-platinum", "border-bronze"];
const regular =
  "border-rounded mb-3 flex justify-between gap-4 rounded-lg border-2 p-4 text-center font-madimi  ";

function Leaderboard({ members }: LobbyMembersProps) {
  return (
    <div className="rounded-lg bg-black p-16">
      <h2 className="mb-3 text-center font-madimi text-2xl text-light-blue">
        Leaderboard
      </h2>
      {members.map((member, idx) => (
        <div
          key={idx}
          className={
            idx < 3 ? regular + borderColors[idx] : regular + "border-muted-red"
          }
        >
          <span className={idx < 3 ? textColors[idx] : `text-white`}>
            {member.name.toUpperCase()}
          </span>
          <span className={idx < 3 ? textColors[idx] : `text-white`}>
            {member.score}
          </span>
        </div>
      ))}
    </div>
  );
}

export default Leaderboard;
