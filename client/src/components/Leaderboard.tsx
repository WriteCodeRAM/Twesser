"use client";
import React, { useState } from "react";
import { LobbyMembersProps } from "../../src/types/index";
import Button from "./Button";
import { socket } from "../app/socket";

const textColors = ["text-gold", "text-platinum", "text-bronze"];
const borderColors = ["border-gold", "border-platinum", "border-bronze"];
const regular =
  "border-rounded mb-2 sm:mb-3 flex justify-between gap-2 sm:gap-4 rounded-lg border-2 p-2 sm:p-4 text-center font-madimi";

function Leaderboard({ members, room, gameOver }: LobbyMembersProps) {
  const [isDisabled, setIsDisabled] = useState(false);

  return (
    <div className="mx-auto max-h-[80vh] w-full max-w-md overflow-auto rounded-lg bg-black p-4 text-center sm:p-8 md:p-12 lg:p-16">
      <h2 className="mb-3 text-center font-madimi text-xl text-light-blue sm:text-2xl">
        {gameOver ? "Game Over!" : "Leaderboard"}
      </h2>

      {members.map((member, idx) => (
        <div
          key={idx}
          className={
            idx < 3
              ? regular + " " + borderColors[idx]
              : regular + " border-muted-red"
          }
        >
          <span
            className={`${idx < 3 ? textColors[idx] : "text-white"} text-sm sm:text-base`}
          >
            {member.name.toUpperCase()}
          </span>
          <span
            className={`${idx < 3 ? textColors[idx] : "text-white"} text-sm sm:text-base`}
          >
            {member.score}
          </span>
        </div>
      ))}
      {gameOver && (
        <Button
          onClick={() => {
            socket.emit("start_game", { room });
            setIsDisabled(true);
            setTimeout(() => setIsDisabled(false), 5000);
          }}
          bgColor="bg-soft-orange"
          borderColor="border-vibrant-teal"
          text="Play Again?"
          type="button"
          disabled={isDisabled}
        />
      )}
    </div>
  );
}

export default Leaderboard;
