import { AxiosError } from 'axios'
import { createContext, ReactNode, useContext, useState } from 'react'
import { api } from '../services/api'
import { Branch, GithubUser, Commit } from '../types'

interface UserErrorResponse {
  status: number | undefined
  message: string | undefined
}
interface GithubContextData {
  githubUser: GithubUser
  getUser: (user: string) => Promise<void>
  branches: Branch[]
  getBranchesByRepo: (repo: string) => Promise<void>
  commits: Commit[]
  getCommitsByBranch: (
    repo: string,
    branch: string,
    page?: number,
  ) => Promise<{ [key: string]: number }>
  loadingUser: boolean
  loadingCommit: boolean
  userError: UserErrorResponse | undefined
}

interface GithubProviderProps {
  children: ReactNode
}

const GithubContext = createContext<GithubContextData>({} as GithubContextData)

export function GithubProvider({ children }: GithubProviderProps) {
  const [githubUser, setGithubUser] = useState<GithubUser>({} as GithubUser)
  const [branches, setBranches] = useState<Branch[]>([])
  const [commits, setCommits] = useState<Commit[]>([])
  const [loadingUser, setLoadingUser] = useState<boolean>(false)
  const [loadingCommit, setLoadingCommit] = useState<boolean>(false)
  const [userError, setUserError] = useState<UserErrorResponse | undefined>()

  async function getUser(user: string) {
    setLoadingUser(true)
    try {
      const overview = await api.get(`/users/${user}`)
      const repos = await api.get(`/users/${user}/repos?per_page=100`)
      const response = {
        ...overview.data,
        repositories: repos.data,
      }
      setUserError(undefined)
      setGithubUser(response)
    } catch (error) {
      setGithubUser({} as GithubUser)
      const err = error as AxiosError
      err.response?.status === 404
        ? setUserError({
            status: err.response?.status,
            message: `The user "${user}" was not found. Make sure that the github username is correct, or try again later.`,
          })
        : setUserError({
            status: err.response?.status,
            message:
              'You are not allowed to access this right now, please try again later.',
          })
    } finally {
      setLoadingUser(false)
    }
  }

  async function getBranchesByRepo(repo: string) {
    try {
      await api
        .get(`/repos/${githubUser.login}/${repo}/branches`)
        .then((response) => setBranches(response.data))
    } catch (error) {
      console.log(error)
    }
  }

  async function getCommitsByBranch(repo: string, branch: string, page = 1) {
    if (!githubUser?.login) {
      console.error('GitHub user login is not defined.')
      setLoadingCommit(false)
      return {}
    }

    setLoadingCommit(true)

    try {
      const response = await api.get(
        `/repos/${githubUser.login}/${repo}/commits?sha=${branch}&per_page=10&page=${page}`,
      )

      if (response?.data) {
        setCommits(response.data)
        return parseLinkHeader(response.headers.link ?? '')
      }

      return {}
    } catch (error) {
      console.error('Error fetching commits:', error)

      return {}
    } finally {
      setLoadingCommit(false)
    }
  }

  function parseLinkHeader(header: string) {
    const parts = header?.split(',')
    const links: { [key: string]: number } = {}

    parts?.forEach((part: string) => {
      const section = part.split(';')
      const url = section[0].replace(/<.*page=(.*)>/, '$1').trim()
      const name = section[1].replace(/rel="(.*)"/, '$1').trim()
      links[name] = Number(url)
    })

    return links
  }

  return (
    <GithubContext.Provider
      value={{
        githubUser,
        getUser,
        branches,
        getBranchesByRepo,
        commits,
        getCommitsByBranch,
        loadingUser,
        loadingCommit,
        userError,
      }}
    >
      {children}
    </GithubContext.Provider>
  )
}

export function useGithub() {
  const context = useContext(GithubContext)
  return context
}
