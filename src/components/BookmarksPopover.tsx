import { forwardRef, useState } from "react";
import JobList from "./JobList";
import { useBookmarkIdsContext } from "../contexts/BookmarkContextProvider";
 
type BookmarksPopoverProps = {

}
const BookmarksPopover = forwardRef<HTMLDivElement, BookmarksPopoverProps>((_ , ref) => {
   const {  bookmarkedJobItems, isLoading } =  useBookmarkIdsContext(); 
 
  return <div ref={ref} className="bookmarks-popover">
    <JobList jobItems={bookmarkedJobItems} isLoading={isLoading} />
  </div>;
})

export default BookmarksPopover