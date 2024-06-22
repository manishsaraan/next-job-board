import { useState, createContext, useContext, useEffect } from "react";
import useLocalStorage from "../hooks/useLocalStorage";

type BookmarkContextProp = {
  handleToggleBookmark: (id: number) => void;
  bookmarkIds: number[];
};
const BookmarkContext = createContext<BookmarkContextProp | null>(null);

export default function BookmarkContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [bookmarkIds, setBookmarkIds] = useLocalStorage<number[]>(
    "bookmarks",
    []
  );

  const handleToggleBookmark = (id: number) => {
    if (bookmarkIds.includes(id)) {
      setBookmarkIds((prev) => prev.filter((item) => item !== id));
    } else {
      setBookmarkIds((prev) => [...prev, id]);
    }
  };

  return (
    <BookmarkContext.Provider
      value={{
        bookmarkIds,
        handleToggleBookmark,
      }}
    >
      {children}
    </BookmarkContext.Provider>
  );
}

export const useBookmarkIdsContext = () => {
  const ctx = useContext(BookmarkContext);

  if (!ctx) {
    throw new Error("Bookmark Context is missing");
  }

  const { handleToggleBookmark, bookmarkIds } = ctx;
  return { handleToggleBookmark, bookmarkIds };
};
