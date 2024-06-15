import useDebounce from "../hooks/useDebounce";

type ResultsCountProp = {
  totalNumberOfResults: number;
};

export default function ResultsCount({
  totalNumberOfResults,
}: ResultsCountProp) {
  const debouncedResults = useDebounce(totalNumberOfResults, 1000);
  return (
    <p className="count">
      <span className="bold">{debouncedResults}</span> results
    </p>
  );
}
