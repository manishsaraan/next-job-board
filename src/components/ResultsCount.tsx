type ResultsCountProp = {
  totalNumberOfResults: number;
};

export default function ResultsCount({
  totalNumberOfResults,
}: ResultsCountProp) {
  return (
    <p className="count">
      <span className="bold">{totalNumberOfResults}</span> results
    </p>
  );
}
