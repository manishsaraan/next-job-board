import { BookmarkFilledIcon } from "@radix-ui/react-icons";
import { useBookmarkIdsContext } from "../contexts/BookmarkContextProvider";

type BookmarkIconProps = {
  id: number;
};
export default function BookmarkIcon({ id }: BookmarkIconProps) {
  const { handleToggleBookmark, bookmarkIds } = useBookmarkIdsContext();

  const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();
    e.preventDefault();
    handleToggleBookmark(id);
  };

  return (
    <button onClick={handleClick} className="bookmark-btn">
      <BookmarkFilledIcon
        className={`${bookmarkIds.includes(id) && "filled"}`}
      />
    </button>
  );
}
