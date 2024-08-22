import React from "react";
import Image from "next/image";

function LoadingComponent() {
  return (
    <div className="flex h-[50px] w-full items-center justify-center">
      <Image
        src="/loading_animation.svg"
        width={75}
        height={75}
        alt="loading animation"
      />
    </div>
  );
}

export default LoadingComponent;
