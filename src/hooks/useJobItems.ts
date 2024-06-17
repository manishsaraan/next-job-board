import { useState, useEffect } from "react";
import { JobItem } from "../types";
import { BASE_URL } from "../constants";
import { useQuery } from "@tanstack/react-query";

// export default function useJobItems(searchText: string) {
//   const [jobItems, setJobItems] = useState<JobItem[]>([]);

//   const [isLoading, setIsLoading] = useState(false);

//   useEffect(() => {
//     if (searchText.length > 0) {
//       fetchJobs(searchText);
//     }
//   }, [searchText]);

//   const fetchJobs = async (searchText: string) => {
//     try {
//       setIsLoading(true);
//       const res = await fetch(`${BASE_URL}?search=${searchText}`);
//       const data = await res.json();

//       console.log(data);
//       setJobItems(data.jobItems);
//       setIsLoading(false);
//     } catch (e) {
//       setIsLoading(false);
//     }
//   };

//   return { isLoading, jobItems } as const;
// }

const fetchJobItems = async (
  searchText: string
): Promise<{
  public: boolean;
  sorted: boolean;
  jobItems: JobItem[];
}> => {
  const res = await fetch(`${BASE_URL}?search=${searchText}`);
  const data = await res.json();

  return data;
};

export default function useJobItems(searchText: string) {
  const { data, isInitialLoading } = useQuery(
    ["job-items", searchText],
    () => fetchJobItems(searchText),
    {
      staleTime: 1000 * 60 * 60, // an hour
      refetchOnWindowFocus: false,
      retry: false,
      enabled: !!searchText,
      onError: () => {},
    }
  );

  if (!data) {
    return {
      isLoading: isInitialLoading,
      jobItems: [],
    };
  }

  const jobItems = data?.jobItems;
  return { isLoading: isInitialLoading, jobItems } as const;
}
