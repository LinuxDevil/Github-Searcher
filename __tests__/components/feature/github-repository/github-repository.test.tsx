import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { IGithubRepository } from "@/models/github-api";
import GithubRepository from "@/components/feature/github-repository/github-repository";
import { fetchGithubExtraData, fetchGithubForkedRepositories } from "@/app/search/searcher.service";

jest.mock("@/app/search/searcher.service");

describe("<GithubRepository />", () => {

  it("should render when there is a repository", () => {
    const mockRepository: IGithubRepository = {
      owner: {
        avatar_url: "http://testing-avatar-url_1",
        id: 1,
        node_id: "testing-node-id_1",
        html_url: "testing-html-url_1",
        login: "testing-login_1"
      },
      node_id: "testing-node-id_1",
      id: 1,
      forks_url: "testing-forks-url_1",
      full_name: "testing-full-name_1",
      description: "testing-description_1",
      languages_url: "testing-languages-url_1"
    };


    (fetchGithubForkedRepositories as jest.Mock).mockImplementation((url, callback) => {
      callback([]);
    });

    (fetchGithubExtraData as jest.Mock).mockImplementation((url, callback) => {
      callback([]);
    });

    render(<GithubRepository {...mockRepository} />);

    expect(screen.getByTestId("github-repository")).toBeInTheDocument();
    expect(screen.getByRole('img')).toBeInTheDocument();
    expect(screen.getByRole('img')).toHaveAttribute('alt', 'Repository testing-full-name_1 logo');
    expect(screen.getByText('testing-full-name_1')).toBeInTheDocument();
    expect(screen.getByText('testing-description_1')).toBeInTheDocument();
    expect(screen.getByTestId('github-repository__languages')).toBeInTheDocument();
    expect(screen.getByTestId('github-repository__languages').textContent).toBe('');
  });

});
