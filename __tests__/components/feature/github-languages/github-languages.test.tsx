import "@testing-library/jest-dom";
import { render, screen, waitFor } from "@testing-library/react";
import { fetchGithubRepositoryLanguages } from "@/app/search/searcher.service";
import GithubLanguages from "@/components/feature/github-languages/github-languages";
import { fetchGithubRepositoryLanguagesMock } from "../../../__helpers__/mock-functions";

jest.mock('@/app/search/searcher.service');

describe('<GithubLanguages />', () => {

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should not render when there is no languages', async () => {
    (fetchGithubRepositoryLanguages as jest.Mock).mockImplementation(fetchGithubRepositoryLanguagesMock([]));

    render(<GithubLanguages languageUrl={'testing-github-languages'} />);

    await waitFor(() => {
      expect(screen.getByTestId('github-repository__languages').textContent).toBe('');
    });
  });

  it('should render with languages', async () => {
    (fetchGithubRepositoryLanguages as jest.Mock).mockImplementation(fetchGithubRepositoryLanguagesMock(['testing-language_1', 'testing-language_2']));

    render(<GithubLanguages languageUrl={'testing-github-languages'} />);

    await waitFor(() => {
      const div = screen.getByTestId('github-repository__languages');
      expect(div.childNodes.length).toBe(2);
      div.childNodes.forEach((childNode, index) => {
        expect(childNode.textContent).toBe(`testing-language_${index + 1}`);
      });
    });
  });

});
