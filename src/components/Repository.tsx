import React from "react";
import { BookBookmark, Star } from "phosphor-react";

export function Repository() {
  return (
    <button className="flex w-full flex-col justify-between rounded-xl bg-gradient-to-r from-outer-space to-charade p-4">
      <div className="mb-3 flex w-full justify-between">
        <div className="text-left text-white">
          <h4 className="text-sm font-bold">repository-title</h4>
          <p className="text-xs">repository description</p>
        </div>
        <div className="text-white">
          <BookBookmark className="text-xl" weight="fill" />
        </div>
      </div>
      <div className="flex w-full items-baseline justify-between">
        <div className="text-white">
          <h4 className="text-xs font-bold uppercase">Typescript</h4>
        </div>
        <div className="flex items-center gap-1 text-white">
          <Star className="text-sm" weight="fill" />
          <span className="text-sm font-bold">1</span>
        </div>
      </div>
    </button>
  );
}
