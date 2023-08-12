import { apiFetcher } from "@/network/api-fetcher";
import { IGithubRepository, IGithubUser } from "@/models/github-api";


export const fetchUserDetails = async (login: string): Promise<IGithubUser> => {
  return await apiFetcher(`https://api.github.com/users/${login}`);
}

export const fetchUserFollowers = async (login: string): Promise<IGithubUser[]> => {
  return await apiFetcher(`https://api.github.com/users/${login}/followers`);
}

export const fetchUserStars = async (login: string): Promise<IGithubRepository[]> => {
  return await apiFetcher(`https://api.github.com/users/${login}/starred`);
}

export const fetchUserRepositories = async (login: string): Promise<IGithubRepository[]> => {
  return await apiFetcher(`https://api.github.com/users/${login}/repos?per_page=6&sort=newest`);
}
