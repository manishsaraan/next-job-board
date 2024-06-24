import { useEffect } from "react"


export default function useOnClickOutside(refs:React.RefObject<HTMLElement>[], handler: () => void){
    useEffect(() => {
        const clickFn = (e: MouseEvent) => {
       
            
          if(e.target instanceof HTMLElement && refs.every((ref) => !ref.current?.contains(e.target as Node))){
            handler()
          }
         
        }
    
        document.addEventListener('click', clickFn)
        return () => {
          document.removeEventListener('click', clickFn)
        }

      },[refs, handler])
}