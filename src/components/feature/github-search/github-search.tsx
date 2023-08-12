import "./github-search.scss";
import Input from "@/components/shared/input/input";
import Select from "@/components/shared/select/select";
import Button from "@/components/shared/button/button";
import { MouseEvent, ChangeEvent, FormEvent, useContext } from "react";
import { apiFetcher } from "@/network/api-fetcher";
import { buildQuery, SEARCH_OPTIONS } from "@/app/search/searcher.service";
import {
  IGithubAPIResponse,
  GithubAPISearchType
} from "@/models/github-api";
import { SearcherContextData } from "@/state/searcher.context";
import useSWRMutation from "swr/mutation";
import { useDebounce } from "@/hooks/useDebounce";

export default function GithubSearch() {

  const {
    query,
    searchType,
    pageSize,
    setQuery,
    setSearchType,
    setIsLoading,
    setNewResults
  } = useContext(SearcherContextData);

  const gitHubEndPoint = buildQuery(query, 0, pageSize, searchType);
  const { trigger } = useSWRMutation<IGithubAPIResponse>(gitHubEndPoint, apiFetcher);

  const onSearchInputChange = (event: ChangeEvent<HTMLInputElement>) => setQuery(event.target.value);

  const onSelectChange = (event: ChangeEvent<HTMLSelectElement>) => setSearchType(event.target.value as GithubAPISearchType);

  const onSearchClicked = (event: MouseEvent<HTMLButtonElement> | FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    void searchData();
  };

  const searchData = async () => {
    if (!query) return;
    setNewResults(0, []);
    setIsLoading(true);
    const { items, total_count } = await trigger();
    setNewResults(total_count, items);
    setIsLoading(false);
  };

  useDebounce(searchType, searchData);

  return (
    <div className="github-search">
      <form className="github-search__container" onSubmit={onSearchClicked}>
        <Select defaultValue={"Choose a type"} options={SEARCH_OPTIONS} onChange={onSelectChange} />
        <Input value={query} placeholder={"Search"} onChange={onSearchInputChange} />
        <Button text="Search" onClick={onSearchClicked} />
      </form>
    </div>
  );
}
