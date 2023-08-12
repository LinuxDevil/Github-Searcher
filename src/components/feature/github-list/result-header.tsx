export const ResultHeader = ({ total, displayedResultType }: { total: number, displayedResultType: string }) => (
  <div className="github-list__results">
    Results: {total} {displayedResultType}
  </div>
);
