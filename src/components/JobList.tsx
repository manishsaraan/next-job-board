import { useActiveIdContext } from "../contexts/ActiveIdContextProvider";
import { JobItem } from "../types";
import JobListItem from "./JobListItem";
import Spinner from "./Spinner";

type JobListProp = {
  jobItems: JobItem[];
  isLoading: boolean;
};
export function JobList({ jobItems, isLoading }: JobListProp) {
  console.log(jobItems, "jobItems");
  const { activeId } = useActiveIdContext();
  return (
    <ul className="job-list">
      {isLoading && <Spinner />}
      {!isLoading &&
        jobItems.map((job) => (
          <JobListItem isActive={activeId === job.id} key={job.id} jobItem={job} />
        ))}
    </ul>
  );
}

export default JobList;
