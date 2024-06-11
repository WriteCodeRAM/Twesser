"use client";
import Carousel from "@/components/Carousel";
import Button from "@/components/Button";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col w-4/5 justify-center align-center">
      <h1 className="text-center text-dark-gray text-lg font-roboto">
        Twesser allows you and 5 other friends to test your trivia knowledge in
        a multiplayer game <br /> to see who can guess the celebrity tweeter the
        fastest.
      </h1>
      <Carousel />
      {/* cta */}
      <div className="">
        <p className="text-center font-bold text-xl text-dark-gray">
          Who tweeted it? <br /> Create or join a lobby and guess the celebrity
          tweeters!
        </p>
        <div className="flex justify-center mt-8 gap-8">
          <Link href={"/join"}>
            <Button
              type="button"
              onClick={""}
              borderColor="soft-orange"
              text="Start Playing"
              bgColor="bg-vibrant-teal"
            ></Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
