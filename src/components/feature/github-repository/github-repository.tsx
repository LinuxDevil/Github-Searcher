import "./github-repository.scss";
import Card from "@/components/shared/card/card";
import Image from "next/image";
import { IGithubRepository } from "@/models/github-api";
import GithubLanguages from "@/components/feature/github-languages/github-languages";
import GithubForks from "@/components/feature/github-forks/github-forks";

export default function GithubRepository({full_name, owner, description, languages_url, forks_url }: IGithubRepository) {
  return (
    <Card>
      <div className="github-repository">
        <div className="github-repository__info">
          {owner && <Image src={owner.avatar_url} alt={`Repository ${full_name} logo`} width={32} height={32}
                  className="github-repository__logo" />}
          <div className="github-repository__name">{full_name}</div>
        </div>
        <div className="github-repository__description">{description}</div>
        <GithubLanguages languageUrl={languages_url} />
        <GithubForks forksUrl={forks_url} />
      </div>
    </Card>
  );
}
