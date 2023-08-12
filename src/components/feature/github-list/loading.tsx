import Image from "next/image";

export const Loading = () => (
  <div className="github-list__loading">
    <Image className="github-list__loading__logo" src={"/images/github.png"} alt={"Loading logo"}
           width={128} height={128} />
    <div className="github-list__loading__text">Searching...</div>
  </div>
);
