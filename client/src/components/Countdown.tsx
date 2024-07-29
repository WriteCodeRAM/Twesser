import React, { useState, useEffect } from "react";

interface CountdownProps {
  time: number;
}

const Countdown = ({ time }: CountdownProps) => {
  const [timer, setTimer] = useState(time);

  useEffect(() => {
    if (timer <= 0) return;
    const intervalId = setInterval(() => {
      setTimer((prevTimer) => prevTimer - 1);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [timer]);

  return (
    <p className="text-center font-madimi font-bold text-soft-orange">
      Next round in:{" "}
      <span className="text-center font-madimi font-bold text-soft-orange">
        {timer}
      </span>
    </p>
  );
};

export default Countdown;
