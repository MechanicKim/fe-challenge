import { type MouseEventHandler } from "react";
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
  return (
    <div className={styles.item}>
      <h3 id={id} role="button" aria-expanded={!fold} tabIndex={0} onClick={toggle}>
        {title}
      </h3>
      <p role="region" aria-labelledby={id}>
        {content}
      </p>
    </div>
  );
}
