'use client';
import Carousel from '@/components/Carousel';
import Button from '@/components/Button';

export default function Home() {
  return (
    <div className="flex flex-col w-4/5 justify-center align-center">
      <h1 className="text-center text-dark-gray text-lg font-roboto">
        Twesser allows you and 5 other friends to test your trivia knowledge in
        a multiplayer style to see who can guess who tweeted the tweet in the
        image out first.
      </h1>
      <Carousel />
      {/* cta */}
      <div className="">
        <p className="text-center font-bold text-xl">
          Think you know Twitter? Create a lobby and challenge your friends, or
          join and jump into the action!
        </p>
        <div className="flex justify-center mt-8 gap-8">
          <Button
            hoverColor="soft-orange"
            borderColor="vibrant-teal"
            text="Create Lobby"
          ></Button>
          <Button
            hoverColor="vibrant-teal"
            borderColor="soft-orange"
            text="Join Lobby"
          ></Button>
        </div>
      </div>
    </div>
  );
}
