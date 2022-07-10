import { createContext, ReactNode, useContext, useState } from "react";
import { api } from "../services/api";
import { Branch, GithubUser, Commit } from "../types";

interface GithubContextData {
  githubUser: GithubUser;
  getUser: (user: string) => Promise<void>;
  branches: Branch[];
  getBranchesByRepo: (user: string, repo: string) => Promise<void>;
  commits: Commit[];
  getCommitsByBranch: (
    user: string,
    repo: string,
    branch: string
  ) => Promise<void>;
  loadingUser: boolean;
  loadingCommit: boolean;
  userError: UserErrorResponse | undefined;
}

interface GithubProviderProps {
  children: ReactNode;
}

interface UserErrorResponse {
  message: string;
}

const GithubContext = createContext<GithubContextData>({} as GithubContextData);

export function GithubProvider({ children }: GithubProviderProps) {
  const [githubUser, setGithubUser] = useState<GithubUser>({} as GithubUser);
  const [branches, setBranches] = useState<Branch[]>([]);
  const [commits, setCommits] = useState<Commit[]>([]);
  const [loadingUser, setLoadingUser] = useState<boolean>(false);
  const [loadingCommit, setLoadingCommit] = useState<boolean>(false);
  const [userError, setUserError] = useState<UserErrorResponse | undefined>();

  async function getUser(user: string) {
    setLoadingUser(true);
    try {
      const overview = await api.get(`/users/${user}`);
      const repos = await api.get(`/users/${user}/repos?per_page=100`);
      const response = {
        ...overview.data,
        repositories: repos.data,
      };
      setUserError(undefined);
      setGithubUser(response);
    } catch (error) {
      setGithubUser({} as GithubUser);
      setUserError({
        message: `The user "${user}" was not found. Make sure that the github username is correct, or try again later.`,
      });
    } finally {
      setLoadingUser(false);
    }
  }

  async function getBranchesByRepo(user: string, repo: string) {
    try {
      await api
        .get(`/repos/${user}/${repo}/branches`)
        .then((response) => setBranches(response.data));
    } catch (error) {
      console.log(error);
    }
  }

  async function getCommitsByBranch(
    user: string,
    repo: string,
    branch: string
  ) {
    setLoadingCommit(true);
    try {
      await api
        .get(`/repos/${user}/${repo}/commits?sha=${branch}&per_page=10`)
        .then((response) => setCommits(response.data));
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingCommit(false);
    }
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
  );
}

export function useGithub() {
  const context = useContext(GithubContext);
  return context;
}
