import { IGithubUser } from "@/models/github-api";
import "./github-user.scss";
import Card from "@/components/shared/card/card";
import Image from "next/image";
import Link from "next/link";

export default function GithubUser({ login, html_url, avatar_url }: IGithubUser) {

  return (
    <Card>
      <div data-testid="github-user" className="github-user">
        <Image className="github-user__avatar" src={avatar_url} alt={`Github user ${login} avatar`} width={64}
               height={64} />
        <div className="github-user__info">
          <div className="github-user__login">{login}</div>
          <Link className="github-user__profile" target="_blank" href={html_url}>GitHub</Link>
          <Link className="github-user__profile" href={`/user/${login}`}>Details</Link>
        </div>
      </div>
    </Card>
  );

}
