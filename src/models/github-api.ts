import { GithubAPIResultsType } from "@/state/searcher.context";

export type GithubAPISearchType = 'repositories' | 'users';

export interface IGithubAPIResponse {
  total_count: number;
  items: GithubAPIResultsType[];
}

export interface IGithubUser {
  id: number;
  login: string;
  avatar_url: string;
  html_url: string;
  node_id: string;
}

export interface IGithubRepository {
  id: number;
  node_id: string;
  full_name: string;
  description: string;
  html_url: string;
  forks_url: string;
  languages_url: string;
  topics: string[];
  owner: IGithubUser;
}

export interface IGithubRepositoryLanguages {
  [key: string]: number;
}
