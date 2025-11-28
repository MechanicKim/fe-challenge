import { useEffect, type RefObject } from "react";

interface Props {
  ref: RefObject<HTMLElement | null>;
  callback: () => void;
}

export default function useClickOutside({ ref, callback }: Props) {
  useEffect(() => {
    if (!ref.current) return;

    function onMouseDown(e: MouseEvent) {
      e.preventDefault();
      e.stopPropagation();
      if (callback) callback();
    }

    document.addEventListener("click", onMouseDown);

    return () => {
      document.removeEventListener("click", onMouseDown);
    }
  }, [ref, callback]);
}
