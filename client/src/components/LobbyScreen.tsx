import { socket } from "@/app/socket";
import { useState } from "react";
import { useEffect } from "react";
import { prisma } from "../lib/prisma";

const LobbyScreen = ({ questions, error }) => {
  // tweets state (eventually fetch 5 items from db)

  return (
    <div className="w-full">
      <div className="bg-white h-64 text-center shadow-lg rounded-lg p-6">
        {error ? (
          <h1 className="text-xl font-semibold text-muted-red">{error}</h1>
        ) : (
          <h1 className="text-xl font-semibold">
            Waiting on host to start game
          </h1>
        )}
        {/* <p>Hello, {tweets?.answer}</p> */}
      </div>
    </div>
  );
};

export default LobbyScreen;
