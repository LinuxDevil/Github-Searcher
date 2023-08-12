import Image from "next/image";

export const NoResults = () => (
  <div data-testid="github-list__empty" className="github-list__empty">
    <Image src={"/images/no-results__logo.png"} alt={"No results logo"} width={128} height={128} />
    <div className="github-list__empty-text">No results, try tro search for something 👀</div>
  </div>
);
