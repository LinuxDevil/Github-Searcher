import { GithubAPISearchType, IGithubRepository, IGithubUser } from "@/models/github-api";
import { createContext, Dispatch, ReactNode, SetStateAction, useCallback, useState } from "react";
import { XOR } from "@/util/types";

const PAGE_SIZE: number = 10;

export type GithubAPIResultsType = XOR<IGithubUser, IGithubRepository>;

interface ISearcherState {
  query: string;
  page: number;
  pageSize: number;
  total: number;
  searchType: GithubAPISearchType;
  displayedResultType: GithubAPISearchType;
  results: GithubAPIResultsType[];
  isLoading: boolean;
  setQuery: Dispatch<SetStateAction<string>>;
  setSearchType: Dispatch<SetStateAction<GithubAPISearchType>>;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
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
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const addNewResults = (total: number, items: GithubAPIResultsType[] = []) => {
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
    isLoading,
    setQuery,
    setSearchType,
    setDisplayedResultType,
    setNewResults,
    setIsLoading,
    addNewResults
  };

  return (
    <SearcherContextData.Provider value={contextValue}>
      {children}
    </SearcherContextData.Provider>
  );
};

export default SearcherContext;
