import { IGithubRepository } from "@/models/github-api";

export const fetchGithubForkedRepositoriesMock = (mockForks: IGithubRepository[] = []) => {
  return (url: string, callback: (data: IGithubRepository[]) => void) => {
    callback(mockForks);
  };
}

export const fetchGithubRepositoryLanguagesMock = (mockLanguages: string[] = []) => {
  return (url: string, callback: (data: string[]) => void) => {
    callback(mockLanguages);
  };
}
