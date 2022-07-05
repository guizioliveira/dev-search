import React from "react";

export const Header = () => {
  return (
    <div className="h-80 w-full bg-outer-space">
      <div className="container mx-auto flex items-center justify-between pt-14">
        <h1 className="max-w-[237px] text-5xl font-extrabold uppercase leading-tight text-white">
          Looking for a <span className="text-apricot">dev</span>?
        </h1>
        <div className="flex flex-col items-end gap-3">
          <h2 className="text-2xl font-semibold text-white">
            Let us help you!
          </h2>
          <div className="max-w-[430px] rounded-2xl bg-apricot py-4 px-8">
            <span className="inline-block text-right text-lg text-white">
              Search for developers and discover their work through the github!
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
