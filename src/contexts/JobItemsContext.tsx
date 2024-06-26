import {  createContext, useContext, useEffect, useMemo, useState } from "react";
import useGetActiveid from "../hooks/useGetActiveId";
import useSearchQuery from "../hooks/useSearchQuery";
import { RESULTS_PER_PAGE } from "../constants";
import { JobItem, PageDirection, SortBy } from "../types";
import { useSearchTextContext } from "./SearchContextProvider";

type JobItemsContextProp = {
    jobItems: JobItem[] | undefined;
    isLoading: boolean;
    jobItemsSorted: JobItem[]
    jobItemSliced: JobItem[]
    totalNumberOfPages: number
    totalNumberOfResults: number
    handleChangeSortBy: (newSortBy: SortBy) => void
    handleChangePage: (direction: PageDirection) => void
    currentPage:number
    sortBy: SortBy
};

const JobItemsContext = createContext<JobItemsContextProp | null>(null);

export default function JobItemsContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
    const {debouncedSearchText} = useSearchTextContext();
    const [currentPage, setCurrentPage] = useState(1);
    const [sortBy, setSortBy] = useState<SortBy>("relevant");
    const { isLoading, jobItems } = useSearchQuery(debouncedSearchText);

    const jobItemsSorted = useMemo(() => [...(jobItems || [])].sort((a, b) => {
      if (sortBy === "relevant") {
        return b.relevanceScore - a?.relevanceScore;
      } else if (sortBy === "recent") {
        return a.daysAgo - b.daysAgo;
      }
  
      return 0;
    }),[sortBy, jobItems]);

    const jobItemSliced = useMemo(() => jobItemsSorted?.slice(
      currentPage * RESULTS_PER_PAGE - RESULTS_PER_PAGE,
      currentPage * 7
    ),[currentPage, jobItemsSorted ]);
    
    const totalNumberOfResults = jobItems?.length;
    const totalNumberOfPages = totalNumberOfResults / RESULTS_PER_PAGE;
  
  
  
    const handleChangePage = (direction: PageDirection) => {
      if (direction === "next") {
        setCurrentPage((prev) => prev + 1);
      } else if (direction === "previous") {
        setCurrentPage((prev) => prev - 1);
      }
    };
  
    const handleChangeSortBy = (newSortBy: SortBy) => {
      setSortBy(newSortBy);
      setCurrentPage(1);
    };
  

  return (
    <JobItemsContext.Provider
      value={{
        jobItems,
        isLoading,
        jobItemsSorted,
        jobItemSliced,
        totalNumberOfPages,
        totalNumberOfResults,
        handleChangeSortBy,
        handleChangePage,
        currentPage,
        sortBy
      }}
    >
      {children}
    </JobItemsContext.Provider>
  );
}

export const useJobItemsContext = () => {
  const ctx = useContext(JobItemsContext);

  if (!ctx) {
    throw new Error("ActiveId Context is missing");
  }

  return ctx
};
