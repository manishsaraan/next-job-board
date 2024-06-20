export type JobItem = {
  id: number;
  badgeLetters: string;
  title: string;
  company: string;
  daysAgo: number;
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
  daysAgo: number;
  relevanceScore: number;
};

export type SortBy = "relevant" | "recent";
export type PageDirection = "next" | "previous";
