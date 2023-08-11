import { IGithubUser } from "@/models/github-api";
import "./github-user.scss";
import Card from "@/components/shared/card/card";
import Image from "next/image";
import Link from "next/link";

export default function GithubUser({ login, html_url, avatar_url }: IGithubUser) {

  return (
    <Card>
      <div className="github-user">
        <Image className='github-user__avatar' src={avatar_url} alt={`Github user ${login} avatar`} width={64} height={64} />
        <div className="github-user__info">
          <div className="github-user__login">{login}</div>
          <Link className="github-user__profile" target="_blank" href={html_url}>Profile</Link>
        </div>
      </div>
    </Card>
  );

}