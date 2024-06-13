import { JobItem } from "../types";
import JobListItem from "./JobListItem";
import Spinner from "./Spinner";

type JobListProp = {
  jobItems: JobItem[];
  isLoading: boolean;
};
export function JobList({ jobItems, isLoading }: JobListProp) {
  return (
    <ul className="job-list">
      {isLoading && <Spinner />}
      {!isLoading &&
        jobItems.map((job) => <JobListItem key={job.id} jobItem={job} />)}
    </ul>
  );
}

export default JobList;
