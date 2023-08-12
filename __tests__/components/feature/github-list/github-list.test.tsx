import "@testing-library/jest-dom";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { SearcherContextData } from "@/state/searcher.context";
import React from "react";
import GithubList from "@/components/feature/github-list/github-list";

jest.mock("@/app/search/searcher.service", () => ({
  buildQuery: jest.fn((query: string, searchType: string, pageSize: number) => ({ query, searchType, pageSize })),
  fetchGithubExtraData: jest.fn((url: string, callback: (data: any) => void) => callback([])),
  fetchGithubForkedRepositories: jest.fn((url: string, callback: (data: any) => void) => callback([]))
}));

jest.mock("@/state/searcher.context", () => ({
  SearcherContextData: {
    query: "",
    searchType: "repositories",
    page: 0,
    pageSize: 10,
    total: 0,
    results: [],
    displayedResultType: "repositories",
    isLoading: false,
    setIsLoading: jest.fn((isLoading: boolean) => isLoading),
    addNewResults: jest.fn((total: number, items: any[]) => ({ total, items }))
  }
}));

jest.mock("swr/mutation", () => ({
  __esModule: true,
  default: jest.fn(() => ({
    trigger: jest.fn(() => Promise.resolve({
      total_count: 4,
      incomplete_results: false,
      items:  [
        {
          owner: {
            avatar_url: "http://testing-avatar-url_3",
            id: 3,
            node_id: "testing-node-id_3",
            html_url: "testing-html-url_3",
            login: "testing-login_3"
          },
          node_id: "testing-node-id_3",
          id: 3,
          forks_url: "testing-forks-url_3",
          full_name: "testing-full-name_3",
          description: "testing-description_3",
          languages_url: "testing-languages-url_3"
        },
        {
          owner: {
            avatar_url: "http://testing-avatar-url_4",
            id: 4,
            node_id: "testing-node-id_4",
            html_url: "testing-html-url_4",
            login: "testing-login_4"
          },
          node_id: "testing-node-id_4",
          id: 4,
          forks_url: "testing-forks-url_4",
          full_name: "testing-full-name_4",
          description: "testing-description_4",
          languages_url: "testing-languages-url_4"
        }
      ]
    }))
  }))
}));

describe("<GithubList />", () => {

  let useContextMock: jest.Mock;
  let useContext = React.useContext;

  beforeEach(() => {
    React.useContext = useContextMock = jest.fn();
  });

  afterEach(() => {
    React.useContext = useContext;
  });

  it('should render', () => {
    useContextMock.mockReturnValue(SearcherContextData);
    render(<GithubList />);
    expect(screen.getByTestId('github-list')).toBeInTheDocument();
    expect(screen.getByTestId('github-list__empty')).toBeInTheDocument();
  });

  it('should render with repositories results', () => {
    const mockRepositories = [
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
    useContextMock.mockReturnValue({ ...SearcherContextData, results: mockRepositories, displayedResultType: 'repositories' });
    render(<GithubList />);
    expect(screen.getByTestId('github-list')).toBeInTheDocument();
    expect(screen.getAllByTestId('github-repository')).toHaveLength(2);
  });

  it('should render with users results', () => {
    const mockUsers = [
      {
        login: 'testing-login_1',
        html_url: 'testing-html-url_1',
        avatar_url: 'http://testing-avatar-url_1',
        id: 1,
        node_id: 'testing-node-id_1',
      },
      {
        login: 'testing-login_2',
        html_url: 'testing-html-url_2',
        avatar_url: 'http://testing-avatar-url_2',
        id: 2,
        node_id: 'testing-node-id_2',
      },
    ];
    useContextMock.mockReturnValue({ ...SearcherContextData, results: mockUsers, displayedResultType: 'users' });
    render(<GithubList />);
    expect(screen.getByTestId('github-list')).toBeInTheDocument();
    expect(screen.getAllByTestId('github-user')).toHaveLength(2);
  });

  it('should add new results when scrolling at the end of the github-list', async () => {
    const mockRepositories = [
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
    const setTotal = jest.fn((total: number) => total);
    const setResults = jest.fn((results: any[]) => results);
    const addNewResults = jest.fn((total: number, items: any[]) => {
      setTotal(total);
      setResults([...mockRepositories, ...items]);
      return { total: items.length + total, items: [...mockRepositories, ...items] };
    });
    useContextMock.mockReturnValue({ ...SearcherContextData, results: mockRepositories, displayedResultType: 'repositories', addNewResults, setTotal, setResults });
    render(<GithubList />);
    expect(screen.getByTestId('github-list')).toBeInTheDocument();
    expect(screen.getAllByTestId('github-repository')).toHaveLength(2);
    fireEvent.scroll(screen.getByTestId('github-list'), { target: { scrollY: 1000 } });
    await waitFor(() => {
      expect(addNewResults).toHaveBeenCalled();
      expect(setTotal).toHaveBeenCalledWith(4);
    });

  });

});
