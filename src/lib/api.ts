import axios from "axios";

const BASE_URL = "https://api.github.com/";

export async function getGithubUser(user: string) {
  const overview = await axios.get(`${BASE_URL}users/${user}`);
  const repos = await axios.get(`${overview.data.repos_url}?per_page=100`);
  const response = {
    ...overview.data,
    repositories: repos.data,
  };
  return response;
}

export async function getRepoBranches(user: string, repo: string) {
  return axios.get(`${BASE_URL}repos/${user}/${repo}/branches`);
}
