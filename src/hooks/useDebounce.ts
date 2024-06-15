import { useEffect, useState } from "react";

export default function useDebounce<T>(searchText: T, time = 500): T {
  const [debouncedSearchText, setDebouncedSearchText] = useState(searchText);

  useEffect(() => {
    const timerId = setTimeout(() => {
      setDebouncedSearchText(searchText);
    }, time);

    return () => clearTimeout(timerId);
  }, [searchText, time]);

  return debouncedSearchText;
}
