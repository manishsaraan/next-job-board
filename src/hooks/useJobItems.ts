import { useState, useEffect } from "react";
import { JobItem } from "../types";

export default function useJobItems(searchText: string) {
  const [jobItems, setJobItems] = useState<JobItem[]>([]);

  const [isLoading, setIsLoading] = useState(false);

  const jobItemSliced = jobItems.slice(0, 7);

  useEffect(() => {
    if (searchText.length > 0) {
      fetchJobs(searchText);
    }
  }, [searchText]);

  const fetchJobs = async (searchText: string) => {
    try {
      setIsLoading(true);
      const res = await fetch(
        `https://bytegrad.com/course-assets/projects/rmtdev/api/data?search=${searchText}`
      );
      const data = await res.json();

      console.log(data);
      setJobItems(data.jobItems);
      setIsLoading(false);
    } catch (e) {
      setIsLoading(false);
    }
  };

  return [isLoading, jobItemSliced] as const;
}
