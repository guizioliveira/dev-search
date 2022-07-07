import React, { useState } from "react";
import { GithubLogo, MapPin, Buildings } from "phosphor-react";
import { RepositoryCard } from "./Repository";
import { GithubUser, Repository } from "../types";
import { formatter, dateFormatter } from "../lib/formaters";

interface CardProps {
  user: GithubUser;
  setOpenModal: () => void;
  setRepository: React.Dispatch<Repository>;
}

export const Card = ({ user, setOpenModal, setRepository }: CardProps) => {
  const [currentTab, setCurrentTab] = useState<string>("overview");

  function handleTabs(event: React.MouseEvent<HTMLButtonElement>) {
    setCurrentTab(event.currentTarget.id);
  }

  function handleSelectRepository(repository: Repository) {
    setOpenModal();
    setRepository(repository);
  }

  return (
    <div className="container mx-auto mt-8 px-3 md:mt-14 md:px-0">
      <div className="w-full rounded-t-2xl bg-iron px-4 pt-6 md:px-8">
        <div className="flex flex-col md:flex-row md:items-center md:gap-8">
          <div className="flex gap-3 md:items-center md:gap-8">
            <img
              className="h-20 w-20 rounded-full md:h-40 md:w-40"
              src={user.avatar_url}
              alt={`Photo of ${user.name || user.login}`}
            />
            <div className="flex w-full flex-col text-outer-space">
              <h3 className="text-base font-extrabold md:text-3xl">
                {user.name || user.login}
              </h3>
              <span className="text-xs font-bold md:text-base ">
                {user.login}
              </span>
              <p className="mt-2 w-full font-roboto text-xs md:mt-3 md:min-w-[400px] md:text-sm">
                {user.bio}
              </p>
            </div>
          </div>
          <div className="mt-3 ml-20 flex items-center justify-center md:m-0 md:w-1/3 md:justify-end">
            <a
              className="flex items-center justify-center gap-1 rounded-lg bg-apricot px-4 py-2 text-xs font-bold text-white transition-colors focus-within:outline-none focus-within:ring-2 focus-within:ring-apricot focus-within:ring-opacity-75 focus-within:ring-offset-2 focus-within:ring-offset-iron hover:bg-apricot-peach focus:outline-none md:py-3 md:text-base"
              href={user.html_url}
              target="_blank"
            >
              Github{" "}
              <GithubLogo className="text-base md:text-2xl" weight="bold" />
            </a>
          </div>
        </div>
        <div className="mt-4 flex gap-4 md:ml-48 md:gap-6">
          <button
            id="overview"
            className="text-sm text-outer-space focus-within:outline-none focus-within:ring-2 focus-within:ring-apricot focus-within:ring-opacity-75 focus-within:ring-offset-2 focus-within:ring-offset-iron focus:outline-none disabled:border-b-4 disabled:border-b-apricot disabled:font-bold disabled:text-apricot md:text-base"
            disabled={currentTab === "overview"}
            onClick={handleTabs}
          >
            Overview
          </button>
          <button
            id="repositories"
            className="text-sm text-outer-space focus-within:outline-none focus-within:ring-2 focus-within:ring-apricot focus-within:ring-opacity-75 focus-within:ring-offset-2 focus-within:ring-offset-iron focus:outline-none disabled:border-b-4 disabled:border-b-apricot disabled:font-bold disabled:text-apricot md:text-base"
            disabled={currentTab === "repositories"}
            onClick={handleTabs}
          >
            Repositories
          </button>
        </div>
      </div>
      <div className="w-full rounded-b-2xl bg-gallery px-4 py-7 md:px-8">
        {currentTab === "repositories" ? (
          <div className="grid grid-cols-1 gap-2 md:grid-cols-3 md:gap-x-8 md:gap-y-5">
            {user.repositories.map((repository) => (
              <RepositoryCard
                repository={repository}
                onClick={() => handleSelectRepository(repository)}
                key={repository.id}
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-end gap-5 md:flex-row">
            <div className="flex w-full items-center justify-center gap-8 rounded-2xl bg-iron px-5 py-3 font-bold text-outer-space md:gap-14 md:px-8">
              <ul>
                <li className="text-xs md:text-base">Repositories</li>
                <li className="text-sm text-charade md:text-xl">
                  {user.public_repos}
                </li>
              </ul>
              <ul>
                <li className="text-xs md:text-base">Followers</li>
                <li className="text-sm text-charade md:text-xl">
                  {user.followers}
                </li>
              </ul>
              <ul>
                <li className="text-xs md:text-base">Following</li>
                <li className="text-sm text-charade md:text-xl">
                  {user.following}
                </li>
              </ul>
            </div>
            <div className="w-full">
              <p className="m-1.5 text-xs md:m-0 md:text-end md:text-base">
                {dateFormatter(user.created_at)}
              </p>
              <ul>
                <li className="mb-2 flex items-center gap-1 text-outer-space">
                  <MapPin className="text-lg md:text-xl" weight="fill" />
                  <span className="text-xs md:text-base">
                    {formatter(user.location)}
                  </span>
                </li>
                <li className="flex items-center gap-1 text-outer-space">
                  <Buildings className="text-lg md:text-xl" weight="fill" />
                  <span className="text-xs md:text-base">
                    {formatter(user.company)}
                  </span>
                </li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
