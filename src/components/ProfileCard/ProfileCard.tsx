import React, { useState } from "react";
import { GithubLogo } from "phosphor-react";
import { RepositoryCard } from "./RepositoryCard";
import { Repository } from "../../types";
import { useGithub } from "../../hooks/useGithub";
import { Overview } from "./Overview";

interface ProfileCardProps {
  setOpenModal: () => void;
  setRepository: React.Dispatch<Repository>;
}

export const ProfileCard = ({
  setOpenModal,
  setRepository,
}: ProfileCardProps) => {
  const [currentTab, setCurrentTab] = useState<string>("overview");
  const { githubUser } = useGithub();

  function handleTabs(event: React.MouseEvent<HTMLButtonElement>) {
    setCurrentTab(event.currentTarget.id);
  }

  function handleSelectRepository(repository: Repository) {
    setRepository(repository);
    setOpenModal();
  }

  return (
    <div className="container mx-auto mt-8 px-3 md:mt-14 md:px-0">
      <div className="w-full rounded-t-2xl bg-iron px-4 pt-6 md:px-8">
        <div className="flex flex-col md:flex-row md:items-center md:gap-8">
          <div className="flex gap-3 md:items-center md:gap-8">
            <img
              className="h-20 w-20 rounded-full md:h-40 md:w-40"
              src={githubUser.avatar_url}
              alt={`Photo of ${githubUser.name || githubUser.login}`}
            />

            <div className="flex w-full flex-col text-outer-space">
              <h3 className="text-base font-extrabold md:text-3xl">
                {githubUser.name || githubUser.login}
              </h3>
              <span className="text-xs font-bold md:text-base ">
                {githubUser.login}
              </span>
              <p className="mt-2 w-full font-roboto text-xs md:mt-3 md:min-w-[400px] md:text-sm">
                {githubUser.bio}
              </p>
            </div>
          </div>
          <div className="mt-3 ml-20 flex items-center justify-center md:m-0 md:w-1/3 md:justify-end">
            <a
              className="flex items-center justify-center gap-1 rounded-lg bg-apricot px-4 py-2 text-xs font-bold text-white transition-colors focus-within:outline-none focus-within:ring-2 focus-within:ring-apricot focus-within:ring-opacity-75 focus-within:ring-offset-2 focus-within:ring-offset-iron hover:bg-apricot-peach focus:outline-none md:py-3 md:text-base"
              href={githubUser.html_url}
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
          githubUser.repositories.length > 0 ? (
            <div className="grid grid-cols-1 gap-2 md:grid-cols-3 md:gap-x-8 md:gap-y-5">
              {githubUser.repositories.map((repository) => (
                <RepositoryCard
                  repository={repository}
                  onClick={() => handleSelectRepository(repository)}
                  key={repository.id}
                />
              ))}
            </div>
          ) : (
            <p className="text-center text-sm text-outer-space md:text-base">
              This user has no public repositories.
            </p>
          )
        ) : (
          <Overview />
        )}
      </div>
    </div>
  );
};
