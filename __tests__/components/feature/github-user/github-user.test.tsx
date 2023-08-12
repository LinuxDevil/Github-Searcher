import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { IGithubUser } from "@/models/github-api";
import GithubUser from "@/components/feature/github-user/github-user";

describe("<GithubUser />", () => {

  it ('should render', () => {
    const mockUser: IGithubUser = {
      login: 'testing-login',
      html_url: 'testing-html-url',
      avatar_url: 'http://testing-avatar-url',
      id: 1,
      node_id: 'testing-node-id',
    }

    render(<GithubUser {...mockUser} />);

    expect(screen.getByTestId('github-user')).toBeInTheDocument();
    expect(screen.getByRole('img')).toBeInTheDocument();
    expect(screen.getByRole('img')).toHaveAttribute('alt', `Github user ${mockUser.login} avatar`);
    expect(screen.getByText(mockUser.login)).toBeInTheDocument();
    expect(screen.getByRole('link')).toBeInTheDocument();
    expect(screen.getByRole('link')).toHaveAttribute('href', mockUser.html_url);
    expect(screen.getByRole('link')).toHaveTextContent('Profile');
  });

});
