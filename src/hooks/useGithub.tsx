import { createContext, ReactNode, useContext, useState } from "react";
import { api } from "../services/api";
import { Branch, GithubUser } from "../types";

interface GithubContextData {
  githubUser: GithubUser;
  getUser: (user: string) => Promise<GithubUser>;
  branches: Branch[];
  getBranchesByRepo: (user: string, repo: string) => Promise<Branch[]>;
}

interface GithubProviderProps {
  children: ReactNode;
}

const GithubContext = createContext<GithubContextData>({} as GithubContextData);

export function GithubProvider({ children }: GithubProviderProps) {
  const [githubUser, setGithubUser] = useState<GithubUser>({} as GithubUser);
  const [branches, setBranches] = useState<Branch[]>([]);

  async function getUser(user: string) {
    try {
      const overview = await api.get(`/users/${user}`);
      const repos = await api.get(`/users/${user}/repos?per_page=100`);
      const response = {
        ...overview.data,
        repositories: repos.data,
      };
      setGithubUser(response);
    } catch (error) {
      console.log("erro");
    }
    return githubUser;
  }

  async function getBranchesByRepo(user: string, repo: string) {
    try {
      await api
        .get(`/repos/${user}/${repo}/branches`)
        .then((response) => setBranches(response.data));
    } catch (error) {
      console.log("error");
    }
    return branches;
  }

  return (
    <GithubContext.Provider
      value={{ githubUser, getUser, branches, getBranchesByRepo }}
    >
      {children}
    </GithubContext.Provider>
  );
}

export function useGithub() {
  const context = useContext(GithubContext);
  return context;
}
