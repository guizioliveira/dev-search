import { useEffect } from 'react'
import { useGithub } from '../../hooks/useGithub'
import { InfoCommit } from './Commit'
import { Loading } from '../Loading'

interface CommitListProps {
  pages: { [key: string]: number }
  setPages: React.Dispatch<{ [key: string]: number }>
  repositoryName: string
  selectedBranch: { name: string }
}

export const CommitList = ({
  pages,
  setPages,
  repositoryName,
  selectedBranch,
}: CommitListProps) => {
  const { commits, loadingCommit, getCommitsByBranch } = useGithub()

  async function goToPage(page: number) {
    const pages = await getCommitsByBranch(
      repositoryName,
      selectedBranch?.name,
      page,
    )
    setPages(pages)
  }

  useEffect(() => {
    async function getCommits() {
      if (selectedBranch !== undefined) {
        const pages = await getCommitsByBranch(
          repositoryName,
          selectedBranch.name,
        )
        setPages(pages)
      }
    }
    getCommits()
  }, [selectedBranch])

  return (
    <>
      {loadingCommit ? (
        <Loading />
      ) : (
        <>
          <div className="max-h-[500px] w-full overflow-y-auto py-5 px-3 md:p-10">
            {commits.map((commit, index) => (
              <InfoCommit commit={commit} key={index} />
            ))}
          </div>
          <div className="flex w-full items-center justify-center gap-3 p-3 md:gap-1 md:p-10">
            <button
              type="button"
              className="rounded-md border-2 border-apricot p-2 text-sm font-bold text-apricot transition-colors hover:bg-apricot hover:text-white focus:outline-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-apricot focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-lighter disabled:bg-lighter disabled:text-apricot disabled:opacity-50 md:text-base"
              disabled={!pages.prev}
              onClick={() => goToPage(pages.prev)}
            >
              Previous
            </button>
            <button
              type="button"
              className="rounded-md border-2 border-apricot p-2 text-sm font-bold text-apricot transition-colors hover:bg-apricot hover:text-white focus:outline-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-apricot focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-lighter disabled:bg-lighter disabled:text-apricot disabled:opacity-50 md:text-base"
              disabled={!pages.next}
              onClick={() => goToPage(pages.next)}
            >
              Next
            </button>
          </div>
        </>
      )}
    </>
  )
}
