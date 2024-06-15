import { useState, useEffect } from "react";
import { JobItem } from "../types";
import { BASE_URL } from "../constants";

export default function useJobItems(searchText: string) {
  const [jobItems, setJobItems] = useState<JobItem[]>([]);

  const [isLoading, setIsLoading] = useState(false);

  const totalNumberOfResults = jobItems.length;
  const jobItemSliced = jobItems.slice(0, 7);

  useEffect(() => {
    if (searchText.length > 0) {
      fetchJobs(searchText);
    }
  }, [searchText]);

  const fetchJobs = async (searchText: string) => {
    try {
      setIsLoading(true);
      const res = await fetch(`${BASE_URL}?search=${searchText}`);
      const data = await res.json();

      console.log(data);
      setJobItems(data.jobItems);
      setIsLoading(false);
    } catch (e) {
      setIsLoading(false);
    }
  };

  return { isLoading, jobItems: jobItemSliced, totalNumberOfResults } as const;
}
