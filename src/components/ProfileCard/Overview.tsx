import React from "react";
import { formatter, dateFormatter } from "../../common/formaters";
import { MapPin, Buildings } from "phosphor-react";
import { useGithub } from "../../hooks/useGithub";

export const Overview = () => {
  const { githubUser } = useGithub();

  return (
    <div className="flex flex-col items-end gap-5 md:flex-row">
      <div className="flex w-full items-center justify-center gap-8 rounded-2xl bg-iron px-5 py-3 font-bold text-outer-space md:gap-14 md:px-8">
        <ul>
          <li className="text-xs md:text-base">Repositories</li>
          <li className="text-sm text-charade md:text-xl">
            {githubUser.public_repos}
          </li>
        </ul>
        <ul>
          <li className="text-xs md:text-base">Followers</li>
          <li className="text-sm text-charade md:text-xl">
            {githubUser.followers}
          </li>
        </ul>
        <ul>
          <li className="text-xs md:text-base">Following</li>
          <li className="text-sm text-charade md:text-xl">
            {githubUser.following}
          </li>
        </ul>
      </div>
      <div className="w-full">
        <ul>
          <li className="m-1.5 text-xs md:m-0 md:text-end md:text-base">
            Joined {dateFormatter(githubUser.created_at)}
          </li>
          <li className="mb-2 flex items-center gap-1 text-outer-space">
            <MapPin className="text-lg md:text-xl" weight="fill" />
            <span className="text-xs md:text-base">
              {formatter(githubUser.location)}
            </span>
          </li>
          <li className="flex items-center gap-1 text-outer-space">
            <Buildings className="text-lg md:text-xl" weight="fill" />
            <span className="text-xs md:text-base">
              {formatter(githubUser.company)}
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
};
