import { useCallback, useEffect, useRef, useState } from "react";
import styles from "./Accordion.module.css";
import AccordionItem from "./AccordionItem";
import philosophy from "./content";

interface AccordionProps {
  multiple: boolean;
}

export default function Accordion({ multiple }: AccordionProps) {
  const [content, setContent] = useState(philosophy);
  const ref = useRef<HTMLDivElement>(null);

  const toggle = useCallback((index: number) => {
    if (multiple) {
      setContent((prev) => {
        const next = [...prev];
        next[index].fold = !next[index].fold;
        return next;
      });
    } else {
      setContent((prev) => {
        const prevFold = prev[index].fold;
        const next = [...prev].map((prevItem) => {
          return {
            ...prevItem,
            fold: true,
          };
        });

        next[index].fold = !prevFold;
        return next;
      });
    }
  }, [multiple]);

  useEffect(() => {
    const container = ref.current;

    function onKeyDown(event: KeyboardEvent) {
      if (!container) return;
      const allHeaders = [...container.querySelectorAll("h3")];
      
      const currentIndex = allHeaders.findIndex(
        (h) => h === document.activeElement
      );
      if (event.key === "ArrowDown") {
        event.preventDefault();
        const nextId = currentIndex === allHeaders.length - 1 ? 0 : currentIndex + 1;
        allHeaders[nextId].focus();
      } else if (event.key === "ArrowUp") {
        event.preventDefault();
        const nextId = currentIndex === 0 ? allHeaders.length - 1 : currentIndex - 1;
        allHeaders[nextId].focus();
      } else if (event.code === "Space" || event.key === "Enter") {
        event.preventDefault();
        toggle(currentIndex);
      }
    }

    if (container) {
      container.addEventListener("keydown", onKeyDown);
    }

    return () => {
      if (container) {
        container.removeEventListener("keydown", onKeyDown);
      }
    };
  }, [toggle]);

  return (
    <div ref={ref} className={styles.container}>
      {content.map((item, index) => (
        <AccordionItem
          key={index}
          id={`accordion-item-${index}`}
          title={item.title}
          content={item.content}
          fold={item.fold}
          toggle={() => toggle(index)}
        />
      ))}
    </div>
  );
}
