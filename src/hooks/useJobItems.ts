import { useState, useEffect } from "react";

export default function useJobItems(searchText: string) {
  const [jobItems, setJobItems] = useState([]);

  const [isLoading, setIsLoading] = useState(false);

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

  return { jobItems, isLoading };
}
