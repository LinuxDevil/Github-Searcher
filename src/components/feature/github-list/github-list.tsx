import "./github-list.scss";
import { useContext, useMemo, useRef } from "react";
import { GithubAPIResultsType, SearcherContextData } from "@/state/searcher.context";
import GithubUser from "@/components/feature/github-user/github-user";
import { buildQuery } from "@/app/search/searcher.service";
import useSWRMutation from "swr/mutation";
import { apiFetcher } from "@/network/api-fetcher";
import GithubRepository from "@/components/feature/github-repository/github-repository";
import { Loading } from "@/components/feature/github-list/loading";
import { ResultHeader } from "@/components/feature/github-list/result-header";
import { NoResults } from "@/components/feature/github-list/no-results";

export default function GithubList() {

  const listRef = useRef<HTMLDivElement>(null);

  const {
    query,
    searchType,
    page,
    pageSize,
    total,
    results,
    displayedResultType,
    isLoading,
    setIsLoading,
    addNewResults
  } = useContext(SearcherContextData);

  const DisplayTemplate = useMemo(() => {
    return displayedResultType === "users" ? GithubUser : GithubRepository;
  }, [displayedResultType]);

  const gitHubEndPoint = buildQuery(query, page, pageSize, searchType);
  const { trigger } = useSWRMutation(gitHubEndPoint, apiFetcher);

  const fetchResults = async () => {
    if (isLoading) return;
    setIsLoading(true);
    const pageCount = Math.ceil(results.length / pageSize);
    if (page > pageCount) return;

    const { items, total_count } = await trigger();
    addNewResults(total_count, items);
    setIsLoading(false);
  };

  const onScroll = () => {
    if (!listRef.current) return;
    const { scrollTop, scrollHeight, clientHeight } = listRef.current;
    if (scrollTop + clientHeight >= scrollHeight) {
      void fetchResults();
    }
  };

  return (
    <div data-testid="github-list" className="github-list" ref={listRef} onScroll={onScroll}>
      {total === 0 && !isLoading && <NoResults />}
      {total > 0 && !isLoading && <ResultHeader total={total} displayedResultType={displayedResultType} />}
      {isLoading && <Loading />}
      {results.map((result: GithubAPIResultsType, index) => (
        <DisplayTemplate key={`${result.id}${result.node_id}${index}`} {...result} />
      ))}
    </div>
  );
}
