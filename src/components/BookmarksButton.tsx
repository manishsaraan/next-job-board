import { TriangleDownIcon } from "@radix-ui/react-icons";
import BookmarksPopover from "./BookmarksPopover";
import { useEffect, useRef, useState } from "react";

export default function BookmarksButton() {
  const [isOpen, setIsOpen] =  useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const popOverRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const clickFn = (e: MouseEvent) => {
   
      if(e.target instanceof HTMLElement && !buttonRef.current?.contains(e.target) && !popOverRef.current?.contains(e.target)){
        setIsOpen(false)
      }
     
    }

    document.addEventListener('click', clickFn)
    return () => {
      document.removeEventListener('click', clickFn)
    }
  },[])
  return (
    <section>
      <button ref={buttonRef} onClick={() => setIsOpen(prev => !prev)} className="bookmarks-btn">
        Bookmarks <TriangleDownIcon />
      </button>
     {isOpen &&  <BookmarksPopover    ref={popOverRef} />}
    </section>
  );
}
