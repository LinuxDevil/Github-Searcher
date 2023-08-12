export type GithubAPISearchType = 'repositories' | 'users';

export interface IGithubAPIResponse {
  total_count: number;
  items: IGithubRepository[] | IGithubUser[];
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
  fork: boolean;
  forks_url: string;
  languages_url: string;
  owner: IGithubUser;
}

export interface IGithubRepositoryLanguages {
  [key: string]: number;
}
