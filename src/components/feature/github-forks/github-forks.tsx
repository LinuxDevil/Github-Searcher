import { useEffect, useState } from "react";
import { fetchGithubForkedRepositories } from "@/app/search/searcher.service";
import Image from "next/image";
import { IGithubRepository } from "@/models/github-api";

export default function GithubForks({ forksUrl }: { forksUrl: string }) {

  const [forks, setForks] = useState<IGithubRepository[]>([]);

  const fetchGithubForks = async () => {
    await fetchGithubForkedRepositories(forksUrl, (data) => {
      setForks(data);
    });
  };

  useEffect(() => {
    void fetchGithubForks();
  }, []);

  return (
    <div>
      {forks.length > 0 && (<div className="github-repository__forks">
        <span>Forks:</span>
        {forks.map(({ owner, node_id, id }, index) => (
          <div key={`${id}${node_id}`} className='github-repository__forkers'>
            <Image src={owner.avatar_url} alt={`Forker ${owner.id} logo`} width={32} height={32}
                   className="github-repository__forks-avatar" />
            <span>{owner.login}</span>
          </div>
        ))}
      </div>)}
    </div>
  );
}
