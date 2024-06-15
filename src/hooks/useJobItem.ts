import { useEffect, useState } from "react";
import { BASE_URL } from "../constants";
import { JobItemExpanded } from "../types";

export default function useJobItem(id: number | null) {
  const [jobItem, setJobItem] = useState<JobItemExpanded | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!id) return;
    try {
      getJobItem(id);
    } catch (error) {}
  }, [id]);

  const getJobItem = async (id: number) => {
    setLoading(true);
    const resp = await fetch(`${BASE_URL}/${id}`);
    const data = await resp.json();

    setJobItem(data.jobItem);
    setLoading(false);
  };

  return { loading, jobItem } as const;
}
