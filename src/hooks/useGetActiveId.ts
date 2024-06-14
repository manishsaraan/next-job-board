import { useEffect, useState } from "react";

export default function useGetActiveid() {
  const [activeId, setActiveId] = useState<number | null>(null);

  useEffect(() => {
    const manageHashChange = () => {
      const id = Number(window.location.hash.slice(1));
      console.log(id);
      setActiveId(id);
    };

    manageHashChange();

    window.addEventListener("hashchange", manageHashChange);

    return () => {
      window.removeEventListener("hashchange", manageHashChange);
    };
  }, []);

  return activeId;
}
