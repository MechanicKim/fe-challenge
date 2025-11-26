import { useRef, type MouseEventHandler } from "react";
import styles from "./Accordion.module.css";

interface AccordionItemProps {
  id: string;
  title: string;
  content: string;
  fold: boolean;
  toggle: MouseEventHandler<HTMLHeadingElement>;
}

export default function AccordionItem({
  id,
  title,
  content,
  fold,
  toggle,
}: AccordionItemProps) {
  const ref = useRef<HTMLDivElement>(null);

  return (
    <div className={styles.item}>
      <h3 id={id} role="button" aria-expanded={!fold} onClick={toggle}>
        {title}
      </h3>
      <p ref={ref} role="region" aria-labelledby={id}>
        {content}
      </p>
    </div>
  );
}
