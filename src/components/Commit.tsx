import React from "react";

export const Commit = () => {
  return (
    <div className="flex w-full items-center gap-3 border-b-2 border-iron py-3 px-3 last:border-none md:gap-12 md:px-6">
      <div className="flex items-center md:gap-4">
        <img
          className="h-7 w-7 rounded-full"
          src="https://avatars.githubusercontent.com/u/21250477?v=4"
          alt="Guilherme de Oliveira"
        />
        <p className="hidden text-sm text-outer-space md:inline">
          Guilherme de Oliveira
        </p>
      </div>
      <span className="text-xs text-outer-space md:text-sm">1 Jun 2022</span>
      <a
        href=""
        target="_blank"
        className="text-xs font-bold text-apricot md:text-sm"
      >
        c8be21e
      </a>
      <p className="max-w-[100px] truncate text-xs text-outer-space md:max-w-xs md:text-sm">
        chore: create license
      </p>
    </div>
  );
};
