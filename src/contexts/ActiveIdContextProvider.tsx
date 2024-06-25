import {  createContext, useContext, useEffect } from "react";
import useGetActiveid from "../hooks/useGetActiveId";

type ActiveIdContextProp = {
  activeId: number | null
};

const ActiveIdContext = createContext<ActiveIdContextProp | null>(null);

export default function ActiveIdContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
      const activeId =   useGetActiveid();

  return (
    <ActiveIdContext.Provider
      value={{
        activeId
      }}
    >
      {children}
    </ActiveIdContext.Provider>
  );
}

export const useActiveIdContext = () => {
  const ctx = useContext(ActiveIdContext);

  if (!ctx) {
    throw new Error("ActiveId Context is missing");
  }


 
  const { activeId } = ctx;
  return {activeId};
};
