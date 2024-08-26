import React from "react";

const TutorialModal = () => {
  return (
    <div className="p-4 sm:p-6">
      <h2 className="mb-3 text-center font-madimi text-xl font-bold sm:text-2xl">
        How to play
      </h2>

      <p className="mb-3 text-center text-sm sm:text-base">
        Each round of Twesser is{" "}
        <span className="text-muted-green">20 seconds</span>
      </p>

      <p className="mb-4 text-center text-sm sm:text-base">
        During the round, you will compete to see who can guess the name behind
        the tweet the quickest!
      </p>

      <h3 className="mb-2 text-center font-madimi text-lg font-semibold sm:text-xl">
        Point System
      </h3>

      <p className="mb-3 text-center text-sm sm:text-base">
        Twesser rewards both <span className="text-muted-green">speed</span> and{" "}
        <span className="text-muted-green">placement</span> of those who answer
        correctly.{" "}
        <span className="text-muted-red">
          Incorrect responses get zero points
        </span>{" "}
        for the corresponding round.
      </p>

      <div className="flex justify-around text-sm sm:text-base">
        <div>
          <h4 className="mb-1 text-center font-semibold underline">
            Placement
          </h4>
          <ul className="list-none space-y-0.5">
            <li className="flex justify-between">
              <span className="text-gold">1st</span>
              <span className="ml-4 text-white">100</span>
            </li>
            <li className="flex justify-between">
              <span className="text-platinum">2nd</span>
              <span className="ml-4 text-white">90</span>
            </li>
            <li className="flex justify-between">
              <span className="text-bronze">3rd</span>
              <span className="ml-4 text-white">80</span>
            </li>
            <li className="flex justify-between">
              <span>4th</span>
              <span className="ml-4 text-white">70</span>
            </li>
            <li className="flex justify-between">
              <span>5th</span>
              <span className="ml-4 text-white">60</span>
            </li>
            <li className="flex justify-between">
              <span>6th</span>
              <span className="ml-4 text-white">50</span>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="mb-1 text-center font-semibold underline">
            Speed (s)
          </h4>
          <ul className="list-none space-y-0.5">
            <li className="flex justify-between">
              <span className="text-gold">16-20</span>
              <span className="ml-4 text-white">2x</span>
            </li>
            <li className="flex justify-between">
              <span className="text-platinum">10-15</span>
              <span className="ml-4 text-white">1.5x</span>
            </li>
            <li className="flex justify-between">
              <span className="text-bronze">6-9</span>
              <span className="ml-4 text-white">1.2x</span>
            </li>
            <li className="flex justify-between">
              <span>0-5</span>
              <span className="ml-4 text-white">1x</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default TutorialModal;
