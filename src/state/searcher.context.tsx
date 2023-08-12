import { GithubAPISearchType, IGithubRepository, IGithubUser } from "@/models/github-api";
import { createContext, Dispatch, ReactNode, SetStateAction, useState } from "react";

const PAGE_SIZE: number = 10;
const DEFAULT_PAGE_NUMBER: number = 1;

export type GithubAPIResultsType = IGithubUser & IGithubRepository;

interface ISearcherState {
  query: string;
  page: number;
  defaultPageNumber: number;
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
  const [page, setPage] = useState<number>(1);
  const [total, setTotal] = useState<number>(0);
  const [query, setQuery] = useState<string>("");
  const [searchType, setSearchType] = useState<GithubAPISearchType>("users");
  const [displayedResultType, setDisplayedResultType] = useState<GithubAPISearchType>("users");
  const [results, setResults] = useState<GithubAPIResultsType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const addNewResults = (total: number, items: GithubAPIResultsType[] = []) => {
    if (!items) return;
    setTotal(total);
    setPage((prevPage) => prevPage + 1);
    setResults( [...results, ...items]);
  };

  const setNewResults = (total: number, items: GithubAPIResultsType[]) => {
    setTotal(total);
    setResults(items);
    setPage(1);
    setDisplayedResultType(searchType);
  };

  const contextValue: ISearcherState = {
    defaultPageNumber: DEFAULT_PAGE_NUMBER,
    pageSize: PAGE_SIZE,
    page,
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
    addNewResults,
  };

  return (
    <SearcherContextData.Provider value={contextValue}>
      {children}
    </SearcherContextData.Provider>
  );
};

export default SearcherContext;
