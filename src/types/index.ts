export type JobItem = {
  id: number;
  badgeLetters: string;
  title: string;
  company: string;
  daysAgo: string;
};

export type JobItemExpanded = JobItem & {
  description: string;
  qualifications: string[];
  reviews: string[];
  duration: string;
  salary: string;
  location: string;
  coverImgURL: string;
  compayURL: string;
};
