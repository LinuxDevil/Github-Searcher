import "@testing-library/jest-dom";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { SearcherContextData } from "@/state/searcher.context";
import React from "react";
import GithubList from "@/components/feature/github-list/github-list";
import { generateMockRepositories, generateMockUsers } from "../../../__helpers__/generators";

jest.mock("@/app/search/searcher.service", () => ({
  buildQuery: jest.fn((query: string, searchType: string, pageSize: number) => ({ query, searchType, pageSize })),
  fetchGithubRepositoryLanguages: jest.fn((url: string, callback: (data: any) => void) => callback([])),
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
      items:  generateMockRepositories(2, 2)
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
    const mockRepositories = generateMockRepositories(2);
    useContextMock.mockReturnValue({ ...SearcherContextData, results: mockRepositories, displayedResultType: 'repositories' });
    render(<GithubList />);
    expect(screen.getByTestId('github-list')).toBeInTheDocument();
    expect(screen.getAllByTestId('github-repository')).toHaveLength(2);
  });

  it('should render with users results', () => {
    const mockUsers = generateMockUsers(2);
    useContextMock.mockReturnValue({ ...SearcherContextData, results: mockUsers, displayedResultType: 'users' });
    render(<GithubList />);
    expect(screen.getByTestId('github-list')).toBeInTheDocument();
    expect(screen.getAllByTestId('github-user')).toHaveLength(2);
  });

  it('should add new results when scrolling at the end of the github-list', async () => {
    const mockRepositories = generateMockRepositories(2);
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
