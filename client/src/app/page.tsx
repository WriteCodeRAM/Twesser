"use client";
import Carousel from "@/components/Carousel";
import Button from "@/components/Button";
import Link from "next/link";

export default function Home() {
  return (
    <div className="align-center flex w-4/5 flex-col justify-center">
      <h1 className="text-center font-roboto text-lg text-dark-gray">
        Twesser allows you and 5 other friends to test your trivia knowledge in
        a multiplayer game <br /> to see who can guess the celebrity tweeter the
        fastest.
      </h1>
      <Carousel />
      {/* cta */}
      <div className="">
        <p className="text-center text-xl font-bold text-dark-gray">
          Who tweeted it? <br /> Create or join a lobby and guess the celebrity
          tweeters!
        </p>
        <div className="mt-8 flex justify-center gap-8">
          <Link href={"/join"}>
            <Button
              type="button"
              onClick={""}
              borderColor="border-soft-orange"
              text="Start Playing"
              bgColor="bg-vibrant-teal"
            ></Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
