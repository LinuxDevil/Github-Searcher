import "@testing-library/jest-dom";
import { fetchGithubForkedRepositories } from "@/app/search/searcher.service";
import { render, screen, waitFor } from "@testing-library/react";
import GithubForks from "@/components/feature/github-forks/github-forks";
import { IGithubRepository } from "@/models/github-api";
import { generateMockRepositories } from "../../../__helpers__/generators";
import { fetchGithubForkedRepositoriesMock } from "../../../__helpers__/mock-functions";

jest.mock("@/app/search/searcher.service");

describe("<GithubForks />", () => {

  afterEach(() => {
    jest.resetAllMocks();
  });

  it("should not render without any forks", async () => {
    (fetchGithubForkedRepositories as jest.Mock).mockImplementation(fetchGithubForkedRepositoriesMock([]));

    render(<GithubForks forksUrl={"testing-github-forks"} />);

    await waitFor(() => {
      expect(screen.queryByText("Forks:")).not.toBeInTheDocument();
    });
  });

  it("should render with forks", async () => {
    const mockForks: IGithubRepository[] = generateMockRepositories(2);
    (fetchGithubForkedRepositories as jest.Mock).mockImplementation(fetchGithubForkedRepositoriesMock(mockForks));

    render(<GithubForks forksUrl="testing-github-forks" />);

    await waitFor(() => {
      expect(fetchGithubForkedRepositories).toHaveBeenCalledTimes(1);
      expect(fetchGithubForkedRepositories).toHaveBeenCalledWith("testing-github-forks", expect.any(Function));
      expect(screen.queryByText("Forks:")).toBeInTheDocument();

      mockForks.forEach(((fork) => {
        const forkAvatar = screen.getByAltText(`Forker ${fork.owner.id} logo`);
        expect(forkAvatar).toBeInTheDocument();
      }));
    });
  });

});
