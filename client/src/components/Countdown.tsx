import React, { useState, useEffect, ReactNode } from "react";
import { CountdownProps } from "../../src/types/index";

interface ExtendedCountdownProps extends CountdownProps {
  children: (currentTimer: number) => ReactNode;
  handleTimerUpdate: (newTimer: number) => void;
  initialTimer: number;
  text: string;
}

const Countdown = ({
  children,
  handleTimerUpdate,
  initialTimer,
  text,
}: ExtendedCountdownProps) => {
  const [timer, setTimer] = useState(initialTimer);

  useEffect(() => {
    if (timer < 0) return;
    const intervalId = setInterval(() => {
      setTimer((prevTimer) => {
        const newTimer = prevTimer - 1;
        handleTimerUpdate(newTimer);
        return newTimer;
      });
    }, 1000);

    return () => clearInterval(intervalId);
  }, [timer, handleTimerUpdate]);

  return (
    <div className="w-full">
      <p className="mb-4 text-center font-madimi font-bold text-soft-orange">
        {text}{" "}
        <span className="text-center font-madimi font-bold text-soft-orange">
          {timer}
        </span>
      </p>
      {children(timer)}
    </div>
  );
};

export default Countdown;
