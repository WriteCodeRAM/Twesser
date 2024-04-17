'use client';
import Carousel from '@/components/Carousel';
import Button from '@/components/Button';
import * as io from 'socket.io-client';

const socket = io.connect('http://localhost:8080');

export default function Home() {
  const sendMsg = () => {
    // socket.emit();
  };
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
          Who tweeted it? <br /> Create or join a lobby and guess the celebrity
          tweeters!
        </p>
        <div className="flex justify-center mt-8 gap-8">
          <Button
            bgColor="bg-soft-orange"
            borderColor="vibrant-teal"
            text="Create Lobby"
          ></Button>
          <Button
            borderColor="soft-orange"
            text="Join Lobby"
            bgColor="bg-vibrant-teal"
          ></Button>
        </div>
      </div>
    </div>
  );
}
