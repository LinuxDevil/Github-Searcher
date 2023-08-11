const headerOptions = {
  headers: {
    Authorization: `token ${process.env.API_TOKEN}`,
  },
  next: {
    revalidate: 15,
  },
}

export const apiFetcher = (url: string) => fetch(url, headerOptions).then(res => res.json());
