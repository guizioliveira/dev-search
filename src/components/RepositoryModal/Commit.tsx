import React from "react";
import { dateFormatter, shortenHash } from "../../common/formaters";
import { Commit } from "../../types";

interface InfoCommitProps {
  commit: Commit;
}

export const InfoCommit = ({ commit }: InfoCommitProps) => {
  return (
    <div className="flex w-full items-center gap-3 border-b-2 border-iron py-3 px-3 last:border-none md:gap-12 md:px-6">
      <div className="flex items-center md:gap-4">
        {commit.author !== null ? (
          <img
            className="h-7 w-7 rounded-full"
            src={commit.author.avatar_url}
            alt={`Photo of ${commit.commit.author.name}`}
          />
        ) : (
          <div className="h-7 w-7 rounded-full bg-oslo-gray"></div>
        )}
        <p className="hidden truncate text-sm text-outer-space md:inline md:w-40">
          {commit.commit.author.name}
        </p>
      </div>
      <span className="min-w-[75px] text-xs text-outer-space md:min-w-[90px] md:text-sm">
        {dateFormatter(commit.commit.author.date)}
      </span>
      <a
        href={commit.html_url}
        target="_blank"
        className="text-xs font-bold text-apricot md:min-w-[65px] md:text-sm"
      >
        {shortenHash(commit.sha)}
      </a>
      <p className="max-w-[100px] truncate text-xs text-outer-space md:max-w-xs md:text-sm">
        {commit.commit.message}
      </p>
    </div>
  );
};
