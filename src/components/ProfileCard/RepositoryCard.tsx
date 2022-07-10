import { Repository } from "../../types";
import { BookBookmark, Star } from "phosphor-react";

interface RepositoryProps {
  repository: Repository;
  onClick: () => void;
}

export function RepositoryCard({ repository, onClick }: RepositoryProps) {
  return (
    <button
      onClick={onClick}
      className="flex w-full flex-col justify-between rounded-xl bg-gradient-to-r from-outer-space to-charade p-4"
    >
      <div className="mb-3 flex w-full justify-between">
        <div className="flex flex-col gap-2 text-left text-white">
          <h4 className="text-sm font-bold">{repository.name}</h4>
          <p className="text-xs line-clamp-3">{repository.description}</p>
        </div>
        <div className="text-white">
          <BookBookmark className="text-xl" weight="fill" />
        </div>
      </div>
      <div className="flex w-full items-baseline justify-between">
        <div className="text-white">
          <h4 className="text-xs font-bold uppercase">{repository.language}</h4>
        </div>
        <div className="flex items-center gap-1 text-white">
          <Star className="text-sm" weight="fill" />
          <span className="text-sm font-bold">
            {repository.stargazers_count}
          </span>
        </div>
      </div>
    </button>
  );
}
