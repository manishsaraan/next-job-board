import { BASE_URL } from "../constants";
import { JobItemExpanded } from "../types";
import { hashQueryKey, useQueries, useQuery } from "@tanstack/react-query";
import handleError from "../utils/handleError";

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

type UseJobItems = {
    isLoading: boolean;
    jobItems: JobItemExpanded[]
}

export default function useJobItems(ids: number[]):UseJobItems {
 

  const results = useQueries({
    queries: ids.map( id => ({
        queryKey: ["job-item", id],
        queryFn: () => fetchJobItem(id),
        staleTime: 1000 * 60 * 60, // an hour
        refetchOnWindowFocus: false,
        retry: false,
        enabled: !!id,
        onError: handleError,
    }))
  } 
  );

  const jobItems = results.map(item => item.data?.jobItem).filter(jobItem => jobItem !== undefined) as JobItemExpanded[];
  const isLoading = results.some(job => job.isLoading);
 
  return {
    jobItems: jobItems,
    isLoading
  } 
}
