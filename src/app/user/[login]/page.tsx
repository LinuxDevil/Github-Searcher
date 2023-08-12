import "./user-details.scss";
import Image from "next/image";
import {
  fetchUserDetails,
  fetchUserFollowers,
  fetchUserRepositories,
  fetchUserStars
} from "@/app/user/[login]/user-details.service";
import Badge from "@/components/shared/badge/badge";
import Link from "next/link";
import { UserRepositories } from "@/components/feature/user-repositories/user-repositories";

interface IUserDetailsProps {
  login: string;
}

export default async function UserDetails({ params }: { params: IUserDetailsProps }) {

  const [user, repositories, followers, stars] = await Promise.all([fetchUserDetails(params.login), fetchUserRepositories(params.login), fetchUserFollowers(params.login), fetchUserStars(params.login)]);

  return (
    <div className="user-details">
      <div className="user-details__info">
        <Image className="user-details__avatar"
               src={user.avatar_url}
               alt={`Github user ${user.login} avatar`}
               width={128}
               height={128} />
        <div className="user-details__name">
          <Link href={user.html_url} target="_blank" className='user-details__link'>{user.login}</Link>
          <p>{followers.length} Followers</p>
          <p>{stars.length} Stars</p>
        </div>
      </div>
      <div className="user-details__section">
        <div className='user-details__section-title'>Most Recent Repositories</div>
        <UserRepositories repositories={repositories}/>
      </div>
    </div>
  );
}
