import { GithubAPISearchType, IGithubRepository, IGithubRepositoryLanguages, IGithubUser } from "@/models/github-api";
import { apiFetcher } from "@/network/api-fetcher";

export const SEARCH_OPTIONS = [
  { value: 'users', label: 'Users' },
  { value: 'repositories', label: 'Repositories' },
];

export const buildQuery = (query: string, page: number, pageSize: number, searchType: GithubAPISearchType) =>
  `https://api.github.com/search/${searchType}?q=${query}&page=${page}&per_page=${pageSize}`;

export const fetchGithubRepositoryLanguages = async (url: string, callback: (languages: string[]) => void) => {
  const response = await apiFetcher(url);
  callback(Object.keys(response) || []);
}

export const fetchGithubForkedRepositories = async (url: string, callback: (forkedRepositories: IGithubRepository[]) => void) => {
  const response = await apiFetcher(`${url}?per_page=3&sort=newest`);
  callback(response || []);
}
