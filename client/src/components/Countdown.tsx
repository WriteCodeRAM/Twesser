import React, { useState, useEffect, createContext, ReactNode } from "react";
import { CountdownProps } from "@/types";

export const CountdownContext = createContext<number | undefined>(undefined);

interface ExtendedCountdownProps extends CountdownProps {
  children: ReactNode;
}

const Countdown = ({ time, children }: ExtendedCountdownProps) => {
  const [timer, setTimer] = useState(time);

  useEffect(() => {
    if (timer <= 0) return;
    const intervalId = setInterval(() => {
      setTimer((prevTimer) => prevTimer - 1);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [timer]);

  return (
    <CountdownContext.Provider value={timer}>
      <div className="w-full">
        <p className="mb-4 text-center font-madimi font-bold text-soft-orange">
          Next round in:{" "}
          <span className="text-center font-madimi font-bold text-soft-orange">
            {timer}
          </span>
        </p>
        {children}
      </div>
    </CountdownContext.Provider>
  );
};

export default Countdown;
