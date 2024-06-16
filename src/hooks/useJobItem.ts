import { BASE_URL } from "../constants";
import { JobItemExpanded } from "../types";
import { useQuery } from "@tanstack/react-query";

// export default function useJobItem(id: number | null) {
//   const [jobItem, setJobItem] = useState<JobItemExpanded | null>(null);
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     if (!id) return;
//     try {
//       getJobItem(id);
//     } catch (error) {}
//   }, [id]);

//   const getJobItem = async (id: number) => {
//     setLoading(true);
//     const resp = await fetch(`${BASE_URL}/${id}`);
//     const data = await resp.json();

//     setJobItem(data.jobItem);
//     setLoading(false);
//   };

//   return { loading, jobItem } as const;
// }

const fetchJobItem = async (
  id: number
): Promise<{
  jobItem: JobItemExpanded;
  public: boolean;
}> => {
  const resp = await fetch(`${BASE_URL}/${id}`);
  if (!resp.ok) {
    const data = await resp.json();
    throw new Error(data.description);
  }

  const data = await resp.json();
  return data;
};
export default function useJobItemss(id: number | null) {
  const { data, isInitialLoading } = useQuery(
    ["job-item", id],
    () => (id ? fetchJobItem(id) : null),
    {
      staleTime: 1000 * 60 * 60, // an hour
      refetchOnWindowFocus: false,
      retry: false,
      enabled: !!id,
      onError: () => {},
    }
  );

  if (!data) {
    return {
      loading: isInitialLoading,
      jobItem: null,
    };
  }

  const jobItem = data.jobItem;
  return { jobItem, loading: isInitialLoading } as const;
}
