import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { IGithubRepository } from "@/models/github-api";
import GithubRepository from "@/components/feature/github-repository/github-repository";
import { fetchGithubRepositoryLanguages, fetchGithubForkedRepositories } from "@/app/search/searcher.service";
import { generateMockRepositories } from "../../../__helpers__/generators";
import { fetchGithubForkedRepositoriesMock, fetchGithubRepositoryLanguagesMock } from "../../../__helpers__/mock-functions";

jest.mock("@/app/search/searcher.service");

describe("<GithubRepository />", () => {

  it("should render when there is a repository", () => {
    const mockRepository: IGithubRepository = generateMockRepositories(1)[0];
    (fetchGithubForkedRepositories as jest.Mock).mockImplementation(fetchGithubForkedRepositoriesMock([mockRepository]));
    (fetchGithubRepositoryLanguages as jest.Mock).mockImplementation(fetchGithubRepositoryLanguagesMock([]));

    render(<GithubRepository {...mockRepository} />);

    expect(screen.getByTestId("github-repository")).toBeInTheDocument();
    expect(screen.getByAltText('Repository name_0 logo')).toBeInTheDocument();
    expect(screen.getByText('name_0')).toBeInTheDocument();
    expect(screen.getByText('description_0')).toBeInTheDocument();
    expect(screen.getByTestId('github-repository__languages')).toBeInTheDocument();
    expect(screen.getByTestId('github-repository__languages').textContent).toBe('');
  });

});
