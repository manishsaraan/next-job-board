import { useJobItemsContext } from "../contexts/JobItemsContext";
import JobList from "./JobList";


export default function JobListSearch(){
    const { isLoading, jobItemSliced} = useJobItemsContext() ;
    return(
        <JobList  isLoading={isLoading} jobItems={jobItemSliced} />
    )
}