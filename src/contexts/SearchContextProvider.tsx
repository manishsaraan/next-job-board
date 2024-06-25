import {  createContext, useContext, useState } from "react";
import useGetActiveid from "../hooks/useGetActiveId";
import useDebounce from "../hooks/useDebounce";

type SearchIdContextProp = {
    searchText:string;
    debouncedSearchText:string;
    onSearchTextChange: (e:React.ChangeEvent<HTMLInputElement>) => void
};

const SearchIdContext = createContext<SearchIdContextProp | null>(null);

export default function SearchIdContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
    const [searchText, setSearchText] = useState("");
    const debouncedSearchText = useDebounce(searchText, 250);
 

      const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchText(e.target.value);
      };

  return (
    <SearchIdContext.Provider
      value={{
        searchText,
        debouncedSearchText,
        onSearchTextChange:handleOnChange
      }}
    >
      {children}
    </SearchIdContext.Provider>
  );
}

export const useSearchTextContext = () => {
  const ctx = useContext(SearchIdContext);

  if (!ctx) {
    throw new Error("ActiveId Context is missing");
  }


 
  return ctx;
};
