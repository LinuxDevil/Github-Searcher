import "@testing-library/jest-dom";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import GithubSearch from "@/components/feature/github-search/github-search";
import { SearcherContextData } from "@/state/searcher.context";
import React from "react";
import { useDebounce } from "@/hooks/useDebounce";
import { buildQuery } from "@/app/search/searcher.service";

jest.mock("@/app/search/searcher.service", () => ({
  SEARCH_OPTIONS: [
    { value: 'users', label: 'Users' },
    { value: 'repositories', label: 'Repositories' },
  ],
  buildQuery: jest.fn((query: string, searchType: string, pageSize: number) => ({ query, searchType, pageSize })),
}));

jest.mock("@/state/searcher.context", () => ({
  SearcherContextData: {
    query: "",
    searchType: "repositories",
    pageSize: 10,
    setQuery: jest.fn((query: string) => query),
    setSearchType: jest.fn((searchType: string) => searchType),
    setIsLoading: jest.fn((isLoading: boolean) => isLoading),
    setNewResults: jest.fn((total: number, items: any[]) => ({ total, items }))
  }
}));

jest.mock(("@/hooks/useDebounce"), () => ({
  useDebounce: jest.fn((searchType, callback) => callback())
}));

jest.mock("swr/mutation", () => ({
  __esModule: true,
  default: jest.fn(() => ({
    trigger: jest.fn(() => Promise.resolve({
      total_count: 0,
      incomplete_results: false,
      items: []
    }))
  }))
}));

describe("<GithubSearch />", () => {

  let useContextMock: jest.Mock;
  let useContext = React.useContext;

  beforeEach(() => {
    useContextMock = React.useContext = jest.fn();
  });

  afterEach(() => {
    React.useContext = useContext;
  });

  it("should render", () => {
    useContextMock.mockReturnValue(SearcherContextData);
    render(<GithubSearch />);
    expect(screen.getByRole("combobox")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Search")).toBeInTheDocument();
    expect(screen.getByText("Search")).toBeInTheDocument();
  });

  it("should render with a query", () => {
    useContextMock.mockReturnValue({ ...SearcherContextData, query: "testing-query" });
    const { getByPlaceholderText } = render(<GithubSearch />);
    expect(getByPlaceholderText("Search")).toBeInTheDocument();
    expect(getByPlaceholderText("Search")).toHaveValue("testing-query");
  });

  it("should search when the search button is clicked", async () => {
    const setQuery = jest.fn((query) => ({ query }));
    useContextMock.mockReturnValue({ ...SearcherContextData, setQuery });
    const { getByPlaceholderText } = render(<GithubSearch />);
    const searchInput = getByPlaceholderText("Search");
    const searchButton = screen.getByText("Search");
    fireEvent.change(searchInput, { target: { value: "testing-query" } });
    fireEvent.click(searchButton);
    await waitFor(() => {
      expect(setQuery).toHaveBeenCalledWith("testing-query");
    });
  });

  it("should change the search type when the select is changed", async () => {
    const setSearchType = jest.fn((searchType) => ({ searchType }));
    useContextMock.mockReturnValue({ ...SearcherContextData, setSearchType });
    render(<GithubSearch />);
    const select = screen.getByRole("combobox");
    fireEvent.change(select, { target: { value: 'repositories' } });

    await waitFor(() => {
      expect(useDebounce).toHaveBeenCalled();
      expect(select).toHaveValue("repositories");
      expect(setSearchType).toHaveBeenCalledWith("repositories");
      expect(buildQuery).toHaveBeenCalledWith("", 0, 10, "repositories");
    });
  });

});
