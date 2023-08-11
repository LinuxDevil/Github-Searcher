import { useEffect, useState } from "react";
import { fetchGithubForkedRepositories } from "@/app/search/searcher.service";
import Image from "next/image";
import { IGithubRepository } from "@/models/github-api";

export default function GithubForks({ forksUrl }: { forksUrl: string }) {

  const [forks, setForks] = useState<IGithubRepository[]>([]);

  const fetchGithubForkers = async () => {
    await fetchGithubForkedRepositories(forksUrl, (data) => {
      setForks(data);
      console.log(data);
    });
  };

  useEffect(() => {
    void fetchGithubForkers();
  }, []);

  return (
    <div>
      {forks.length > 0 && (<div className='github-repository__forks'>
        <span>Forks:</span>
        {forks.map(({ owner, node_id, id }, index) => (
          <Image key={`${id}${node_id}`} src={owner.avatar_url} alt={`Forker ${owner.id} logo`} width={32} height={32}
                 className="github-repository__forks-avatar" />
        ))}
      </div>)}
    </div>
  );
}
