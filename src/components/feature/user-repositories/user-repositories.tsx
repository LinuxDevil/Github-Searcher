import { IGithubRepository } from "@/models/github-api";
import { UserRepository } from "@/components/feature/user-repository/user-repository";

export const UserRepositories = ({ repositories }: { repositories: IGithubRepository[] }) => (
  <div className="user-details__repositories">
    {repositories.map((repo) => <UserRepository key={`${repo.id}${repo.node_id}`} fullName={repo.full_name}
                                                description={repo.description} topics={repo.topics || []}
                                                repoLink={repo.html_url} />
    )}
  </div>
);

