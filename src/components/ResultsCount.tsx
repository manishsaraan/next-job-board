import { useJobItemsContext } from "../contexts/JobItemsContext";
import useDebounce from "../hooks/useDebounce";

export default function ResultsCount( ) {
  const { totalNumberOfResults } = useJobItemsContext()
  const debouncedResults = useDebounce(totalNumberOfResults, 1000);
  return (
    <p className="count">
      <span className="bold">{debouncedResults}</span> results
    </p>
  );
}
