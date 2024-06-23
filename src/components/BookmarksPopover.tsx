import { useState } from "react";
import JobList from "./JobList";
import { useBookmarkIdsContext } from "../contexts/BookmarkContextProvider";
import useJobItems from "../hooks/useJobItems";

export default function BookmarksPopover() {
   const {  bookmarkedJobItems, isLoading } =  useBookmarkIdsContext(); 
 
  return <div className="bookmarks-popover">
    <JobList jobItems={bookmarkedJobItems} isLoading={isLoading} />
  </div>;
}
