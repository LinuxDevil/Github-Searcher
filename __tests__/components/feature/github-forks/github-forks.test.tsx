import "@testing-library/jest-dom";
import { fetchGithubForkedRepositories } from "@/app/search/searcher.service";
import { render, screen, waitFor } from "@testing-library/react";
import GithubForks from "@/components/feature/github-forks/github-forks";
import { IGithubRepository } from "@/models/github-api";


jest.mock("@/app/search/searcher.service");

describe("<GithubForks />", () => {

  afterEach(() => {
    jest.resetAllMocks();
  });

  it("should not render without any forks", async () => {
    (fetchGithubForkedRepositories as jest.Mock).mockImplementation((url, callback) => {
      callback([]);
    });

    render(<GithubForks forksUrl={"testing-github-forks"} />);

    await waitFor(() => {
      expect(screen.queryByText("Forks:")).not.toBeInTheDocument();
    });

  });

  it("should render with forks", async () => {
    const mockForks: IGithubRepository[] = [
      {
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
      },
      {
        owner: {
          avatar_url: "http://testing-avatar-url_2",
          id: 2,
          node_id: "testing-node-id_2",
          html_url: "testing-html-url_2",
          login: "testing-login_2"
        },
        node_id: "testing-node-id_2",
        id: 2,
        forks_url: "testing-forks-url_2",
        full_name: "testing-full-name_2",
        description: "testing-description_2",
        languages_url: "testing-languages-url_2"
      }
    ];

    (fetchGithubForkedRepositories as jest.Mock).mockImplementation((url, callback) => {
      callback(mockForks);
    });

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
