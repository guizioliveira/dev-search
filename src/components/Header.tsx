import React from "react";

export const Header = () => {
  return (
    <div className="h-80 w-full bg-outer-space ">
      <div className="container mx-auto flex flex-col justify-between gap-3 px-3 pt-10 md:flex-row md:items-center md:gap-0 md:px-0 md:pt-14">
        <h1 className="max-w-[168px] text-[34px] font-extrabold uppercase leading-tight text-white md:max-w-[237px] md:text-5xl">
          Looking for a <span className="text-apricot">dev</span>?
        </h1>
        <div className="flex justify-between gap-3 md:flex-col md:items-end md:justify-start">
          <h2 className="text-[15px] font-semibold text-white md:text-2xl">
            Let us help you!
          </h2>
          <div className="-mt-16 max-w-[170px] rounded-2xl bg-apricot py-4 px-6 md:mt-0 md:max-w-[430px] md:px-8">
            <span className="inline-block text-[13px] text-white md:text-right md:text-lg">
              Search for developers and discover their work through the github!
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
