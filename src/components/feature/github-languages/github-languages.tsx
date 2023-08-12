import Badge from "@/components/shared/badge/badge";
import { useEffect, useState } from "react";
import { fetchGithubExtraData } from "@/app/search/searcher.service";

export default function GithubLanguages({ languageUrl }: {languageUrl: string}) {

  const [languages, setLanguages] = useState<string[]>([]);

  const fetchLanguages = async () => {
    await fetchGithubExtraData(languageUrl, (data) => {
        setLanguages(data);
    });
  }

  useEffect(() => {
    void fetchLanguages();
  }, []);

  return (
    <div data-testid='github-repository__languages' className="github-repository__languages">
      {languages.map((language, index) => (
        <Badge key={index} text={language} />
      ))}
    </div>
  )
}
