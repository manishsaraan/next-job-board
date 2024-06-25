import { forwardRef } from "react";
import JobList from "./JobList";
import { useBookmarkIdsContext } from "../contexts/BookmarkContextProvider";
import { createPortal } from "react-dom";
 
type BookmarksPopoverProps = {

}
const BookmarksPopover = forwardRef<HTMLDivElement, BookmarksPopoverProps>((_ , ref) => {
   const {  bookmarkedJobItems, isLoading } =  useBookmarkIdsContext(); 
 
  return createPortal(<div ref={ref} className="bookmarks-popover">
    <JobList jobItems={bookmarkedJobItems} isLoading={isLoading} />
  </div>, document.body);
})

export default BookmarksPopover