import "./github-list.scss";
import { useContext, useMemo, useRef, useState } from "react";
import { SearcherContextData } from "@/state/searcher.context";
import GithubUser from "@/components/feature/github-user/github-user";
import { buildQuery } from "@/app/search/searcher.service";
import useSWRMutation from "swr/mutation";
import { apiFetcher } from "@/network/api-fetcher";
import Image from "next/image";
import GithubRepository from "@/components/feature/github-repository/github-repository";
import { throttle } from "lodash";
export default function GithubList() {

  const listRef = useRef<HTMLDivElement>(null);
  const [isLFetching, setIsFetching] = useState(false);

  const {
    query,
    searchType,
    page,
    pageSize,
    total,
    results,
    isLoading,
    displayedResultType,
    addNewResults
  } = useContext(SearcherContextData);

  const noResults = query ? 'No results! 😿' : 'Try to search for something! 👀';

  const DisplayTemplate = useMemo(() => {
    return searchType === 'users' ? GithubUser : GithubRepository
  }, [searchType]);

  const gitHubEndPoint = buildQuery(query, page, pageSize, searchType);
  const { trigger } = useSWRMutation(gitHubEndPoint, apiFetcher);

  const fetchResults = async () => {
    if (isLFetching) return;
    setIsFetching(true);
    const pageCount = Math.ceil(results.length / pageSize);
    if (page > pageCount) return;

    const { items, total_count } = await trigger();
    addNewResults(total_count, items);
    setIsFetching(false);
  };

  const onScroll = () => {
    if (!listRef.current) return;
    const { scrollTop, scrollHeight, clientHeight } = listRef.current;
    if (scrollTop + clientHeight >= scrollHeight) {
      void fetchResults();
    }
  };

  const throttledOnScroll = throttle(onScroll, 200);

  return (
    <div className="github-list" ref={listRef} onScroll={throttledOnScroll}>
      {results.length === 0 && !isLoading &&
        <div className="github-list__empty">
          <Image src={"/images/no-results__logo.png"} alt={"No results logo"} width={128} height={128} />
          <div className="github-list__empty-text">{noResults}</div>
        </div>}
      {results.length > 0 && !isLoading &&
        <div className="github-list__results">
          Results: {total} {displayedResultType}
        </div>}
      {isLoading &&
        <div className="github-list__loading">
          <Image className='github-list__loading__logo' src={"/images/no-results__logo.png"} alt={"Loading logo"} width={128} height={128} />
          <div className="github-list__loading__text">Searching...</div>
        </div>
      }
      {results.map((result, index) => (
        <DisplayTemplate key={`${result.id}${result.node_id}`} {...result} />
      ))}
    </div>
  );
}
