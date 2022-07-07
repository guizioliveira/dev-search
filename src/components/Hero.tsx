import React from "react";

export function Hero() {
  return (
    <div className="container mx-auto mt-4 flex w-full flex-col items-center gap-8 p-6 md:mt-12 md:flex-row md:p-0">
      <img
        className="order-2 max-w-xs md:order-1 md:max-w-md"
        src="/src/assets/hero.svg"
        alt="Image of a developer coding setting on a computer"
      />
      <div className="order-1 flex flex-col gap-5 md:order-2">
        <h1 className="text-3xl font-extrabold text-apricot md:text-5xl">
          Take a look at what the devs are up to!
        </h1>
        <p className="text-sm text-outer-space md:text-base">
          Just search the developer's github user to find their repositories and
          check their latest updates.
        </p>
      </div>
    </div>
  );
}
