import { useRef, useState } from "react";
import styles from "./Editor.module.css";
import Tools from "./Tools";
import { COMMAND } from "./constants";

export default function Editor() {
  const ref = useRef(null);
  const [currentStyles, setCurrentStyles] = useState<
    Record<string, boolean | string>
  >({});

  function updateCurrnetStyles(target: HTMLElement | null) {
    let current = target;

    const styles: Record<string, boolean | string> = {};
    while (current && current !== ref.current) {
      const tagName = current.tagName;
      if (tagName === "B") {
        styles[COMMAND.BOLD] = true;
      } else if (tagName === "I") {
        styles[COMMAND.ITALIC] = true;
      } else if (tagName === "LI") {
        styles[COMMAND.UNORDERED_LIST] = true;
      } else if (tagName === "A") {
        const linkURL = (current as HTMLAnchorElement).href;
        styles[COMMAND.LINK] = linkURL;
      }
      current = current.parentElement;
    }
    setCurrentStyles(styles);
  }

  return (
    <div className={styles.container}>
      <Tools
        currentStyles={currentStyles}
        updateCurrentStyles={setCurrentStyles}
      />
      <div
        ref={ref}
        id="editor"
        className={styles.editor}
        contentEditable
        onKeyUp={(e) => {
          if (
            !["ArrowUp", "ArrowRight", "ArrowDown", "ArrowLeft"].includes(e.key)
          )
            return;

          const selection = window.getSelection();
          if (!selection || selection.rangeCount === 0) return;

          const range = selection.getRangeAt(0);
          updateCurrnetStyles(range.commonAncestorContainer.parentElement);
        }}
        onClick={(e) => {
          updateCurrnetStyles(e.target as HTMLElement);
        }}
      />
    </div>
  );
}
