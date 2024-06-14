import { useEffect, useState } from "react";
import { BASE_URL } from "../constants";
import { JobItemExpanded } from "../types";

export default function useJobItem(id: number | null) {
  const [jobItem, setJobItem] = useState<JobItemExpanded | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!id) return;
    getJobItem(id);
    try {
    } catch (error) {}
  }, [id]);

  const getJobItem = async (id: number) => {
    setLoading(false);
    const resp = await fetch(`${BASE_URL}/${id}`);
    const data = await resp.json();
    setJobItem(data.jobItem);
    setLoading(true);
  };

  return [loading, jobItem] as const;
}
