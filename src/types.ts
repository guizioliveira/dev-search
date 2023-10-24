export type Repository = {
  id: number
  name: string
  description: string
  language: string
  stargazers_count: number
}

export type GithubUser = {
  login: string
  name: string
  avatar_url: string
  html_url: string
  company: string
  bio: string
  public_repos: number
  followers: number
  following: number
  location: string
  created_at: string
  repositories: Array<Repository>
}

export type Branch = {
  name: string
}

export type Commit = {
  sha: string
  commit: {
    message: string
    author: {
      name: string
      date: string
    }
  }
  html_url: string
  author: {
    login: string
    avatar_url: string
  }
}
