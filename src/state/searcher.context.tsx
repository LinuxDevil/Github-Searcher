import { GithubAPISearchType, GithubRepository, GithubUser } from "@/models/github-api";
import { createContext, Dispatch, ReactNode, SetStateAction, useCallback, useState } from "react";

const PAGE_SIZE: number = 10;

export type GithubAPIResultsType = GithubUser | GithubRepository;

interface ISearcherState {
  query: string;
  page: number;
  pageSize: number;
  total: number;
  searchType: GithubAPISearchType;
  displayedResultType: GithubAPISearchType;
  results: GithubAPIResultsType[];
  setQuery: Dispatch<SetStateAction<string>>;
  setSearchType: Dispatch<SetStateAction<GithubAPISearchType>>;
  setDisplayedResultType: Dispatch<SetStateAction<GithubAPISearchType>>;
  setNewResults: (total: number, items: GithubAPIResultsType[]) => void;
  addNewResults: (total: number, items: GithubAPIResultsType[]) => void;
}

const initialState: ISearcherState = {} as ISearcherState;
export const SearcherContextData = createContext<ISearcherState>(initialState);

const SearcherContext = ({ children }: { children: ReactNode }) => {
  const [page, setPage] = useState<number>(0);
  const [total, setTotal] = useState<number>(0);
  const [query, setQuery] = useState<string>("");
  const [searchType, setSearchType] = useState<GithubAPISearchType>("users");
  const [displayedResultType, setDisplayedResultType] = useState<GithubAPISearchType>("users");
  const [results, setResults] = useState<GithubAPIResultsType[]>([]);

  const addNewResults = (total: number, items: GithubAPIResultsType[]) => {
    setTotal(total);
    setPage((prevPage) => prevPage + 1);
    setResults((prevResults) => [...prevResults, ...items]);
  };


  const setNewResults = (total: number, items: GithubAPIResultsType[]) => {
    setTotal(total);
    setResults(items);
    setPage(1);
    setDisplayedResultType(searchType);
  };

  const contextValue: ISearcherState = {
    page,
    pageSize: PAGE_SIZE,
    total,
    query,
    searchType,
    displayedResultType,
    results,
    setQuery,
    setSearchType,
    setDisplayedResultType,
    setNewResults,
    addNewResults
  };

  return (
    <SearcherContextData.Provider value={contextValue}>
      {children}
    </SearcherContextData.Provider>
  );
};

export default SearcherContext;
