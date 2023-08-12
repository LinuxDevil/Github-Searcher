const buildMockRepository = (id: number, name: string, description: string, languages: string[], owner: string) => ({
  id,
  node_id: `node_id_${id}`,
  full_name: name,
  description,
  forks_url: `forks_url_${id}`,
  languages_url: `languages_url_${id}`,
  owner: generateMockUsers(1)[0],
  languages
});

const buildMockUser = (id: number, login: string, avatar_url: string, html_url: string, node_id: string) => ({
  id: (Math.random() * 1000) + id,
  login,
  avatar_url,
  html_url,
  node_id
});

export const generateMockRepositories = (count: number, startWith: number = 0) => {
  const repositories = [];
  for (let i = startWith; i < count; i++) {
    repositories.push(buildMockRepository(i, `name_${i}`, `description_${i}`, ["language_1", "language_2"], `owner_${i}`));
  }
  return repositories;
};

export const generateMockUsers = (count: number, startWith: number = 0) => {
  const users = [];
  for (let i = startWith; i < count; i++) {
    users.push(buildMockUser(i, `login_${i}`, `http://avatar_url_${i}`, `html_url_${i}`, `node_id_${i}`));
  }
  return users;
};
