"use client";

import Image from "next/image";
import GithubSearch from "@/components/feature/github-search/github-search";
import "./search.scss";
import SearcherContext from "@/state/searcher.context";
import GithubList from "@/components/feature/github-list/github-list";
import ErrorBoundary from "@/app/error-boundary";

export default function Search() {

  return (
    <ErrorBoundary>
      <div className="search">
        <Image src={"/images/logo.png"} alt={"Github logo"} width={128} height={128} />
        <div className="search__container">
          <SearcherContext>
            <GithubSearch />
            <GithubList />
          </SearcherContext>
        </div>
      </div>
    </ErrorBoundary>
  );
}
