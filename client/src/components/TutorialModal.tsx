import React from "react";

// onCLick in here closes modal
// need ? icon in nav to showModal

const TutorialModal = () => {
  return (
    <div className="relative mx-auto w-full max-w-2xl rounded-lg bg-black p-6 text-light-blue md:p-8">
      <h1 className="mb-4 font-madimi text-2xl font-bold md:mb-6 md:text-3xl">
        How to play
      </h1>

      <div className="mb-6 space-y-3 md:mb-8 md:space-y-4">
        <p className="text-base md:text-lg">
          Each round of Twesser is{" "}
          <span className="font-semibold text-muted-red">20 seconds</span>
        </p>
        <p className="text-base md:text-lg">
          During the round, you will compete to see who can guess the name
          behind the tweet the quickest!
        </p>
      </div>

      <h2 className="mb-3 text-xl font-bold md:mb-4 md:text-2xl">
        Point System
      </h2>
      <p className="mb-4 text-base md:mb-6 md:text-lg">
        Twesser rewards both <span className="text-muted-green">speed</span> and{" "}
        <span className="text-muted-green">placement</span> of those who answer
        correctly.{" "}
        <span className="text-muted-red">
          Incorrect responses get zero points
        </span>{" "}
        for the corresponding round.
      </p>

      <div className="flex flex-col justify-between space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0 md:space-x-8">
        <table className="w-full border-collapse text-center text-sm sm:w-1/2 md:text-base">
          <thead>
            <tr>
              <th className="border-b pb-2">Placement</th>
              <th className="border-b pb-2">Points</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="text-gold py-1">1st</td>
              <td>100</td>
            </tr>
            <tr>
              <td className="text-platinum py-1">2nd</td>
              <td>90</td>
            </tr>
            <tr>
              <td className="text-bronze py-1">3rd</td>
              <td>80</td>
            </tr>
            <tr>
              <td className="py-1">4th</td>
              <td>70</td>
            </tr>
            <tr>
              <td className="py-1">5th</td>
              <td>60</td>
            </tr>
            <tr>
              <td className="py-1">6th</td>
              <td>50</td>
            </tr>
          </tbody>
        </table>

        <table className="w-full border-collapse text-center text-sm sm:w-1/2 md:text-base">
          <thead>
            <tr>
              <th className="border-b pb-2">Speed (s)</th>
              <th className="border-b pb-2">Multiplier</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="text-gold py-1">16-20</td>
              <td>2x</td>
            </tr>
            <tr>
              <td className="text-platinum py-1">10-15</td>
              <td>1.5x</td>
            </tr>
            <tr>
              <td className="text-bronze py-1">6-9</td>
              <td>1.2x</td>
            </tr>
            <tr>
              <td className="py-1">0-5</td>
              <td>1x</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TutorialModal;
