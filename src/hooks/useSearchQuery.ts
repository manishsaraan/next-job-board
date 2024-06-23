import { useState, useEffect } from "react";
import { JobItem, JobItemExpanded } from "../types";
import { BASE_URL } from "../constants";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import handleError from "../utils/handleError";

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
  jobItems: JobItemExpanded[];
}> => {
  const res = await fetch(`${BASE_URL}?search=${searchText}`);

  if (!res.ok) {
    const data = await res.json();
    throw new Error(data.description);
  }

  const data = await res.json();

  return data;
};

export default function useSearchQuery(searchText: string) {
  const { data, isInitialLoading } = useQuery(
    ["job-items", searchText],
    () => fetchJobItems(searchText),
    {
      staleTime: 1000 * 60 * 60, // an hour
      refetchOnWindowFocus: false,
      retry: false,
      enabled: !!searchText,
      onError: handleError,
    }
  );

  if (!data) {
    return {
      isLoading: isInitialLoading,
      jobItems: [],
    };
  }

  const jobItems = data?.jobItems || [];
  return { isLoading: isInitialLoading, jobItems } as const;
}
