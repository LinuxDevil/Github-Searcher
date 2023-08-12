import Link from "next/link";
import Badge from "@/components/shared/badge/badge";

export const UserRepository = ({ fullName, description, topics, repoLink }: { fullName: string, description: string, repoLink: string, topics: string[] }) => (
  <div className="user-details__repository">
    <div className="user-details__repository__info">
      <Link href={repoLink} target='_blank' className="user-details__repository__name">{fullName}</Link>
    </div>
    <div className="user-details__repository__description">{description}</div>
    <div className="user-details__repository__topics">
      {topics.map((topic, index) => (
        <Badge key={index} text={topic} />
      ))}
    </div>
  </div>
);

