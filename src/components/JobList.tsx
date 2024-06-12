import { JobItem } from "../types";
import JobListItem from "./JobListItem";

type JobListProp = {
  jobItems: JobItem[];
};
export function JobList({ jobItems }: JobListProp) {
  return (
    <ul className="job-list">
      {jobItems.map((job) => (
        <JobListItem jobItem={job} />
      ))}
    </ul>
  );
}

export default JobList;
