import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { IGithubUser } from "@/models/github-api";
import GithubUser from "@/components/feature/github-user/github-user";
import { generateMockUsers } from "../../../__helpers__/generators";

describe("<GithubUser />", () => {

  it ('should render', () => {
    const mockUser: IGithubUser = generateMockUsers(1)[0];

    render(<GithubUser {...mockUser} />);

    expect(screen.getByTestId('github-user')).toBeInTheDocument();
    expect(screen.getByRole('img')).toBeInTheDocument();
    expect(screen.getByRole('img')).toHaveAttribute('alt', `Github user ${mockUser.login} avatar`);
    expect(screen.getByText(mockUser.login)).toBeInTheDocument();
    expect(screen.getAllByRole('link')).toHaveLength(2);
  });

});
