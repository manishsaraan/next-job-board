import useGetActiveid from "../hooks/useGetActiveId";
import { JobItem } from "../types";
import JobListItem from "./JobListItem";
import Spinner from "./Spinner";

type JobListProp = {
  jobItems: JobItem[];
  isLoading: boolean;
};
export function JobList({ jobItems, isLoading }: JobListProp) {
  console.log(jobItems, "jobItems");
  const id = useGetActiveid();
  return (
    <ul className="job-list">
      {isLoading && <Spinner />}
      {!isLoading &&
        jobItems.map((job) => (
          <JobListItem isActive={id === job.id} key={job.id} jobItem={job} />
        ))}
    </ul>
  );
}

export default JobList;
