import { useRef, useState } from "react";
import { marked } from "marked";
import styles from "./Editor.module.css";
import Tools from "./Tools";
import { COMMAND } from "./constants";

export default function Editor() {
  const [currentStyles, setCurrentStyles] = useState<
    Record<string, boolean | string>
  >({});
  const ref = useRef(null);
  const previewRef = useRef(null);

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

  function toMakrdown(dom: Node): string {
    const lines = [];
    const children = [...dom.childNodes];
    for (const child of children) {
      if (child.nodeName === "#text" && child.textContent) {
        lines.push(child.textContent);
      } else if (child.nodeName === "DIV") {
        lines.push("<br/>", toMakrdown(child));
      } else if (child.nodeName === "B") {
        lines.push("**", toMakrdown(child), "**");
      } else if (child.nodeName === "I") {
        lines.push("_", toMakrdown(child), "_");
      } else if (child.nodeName === "A") {
        const href = (child as HTMLAnchorElement).href;
        lines.push("[", toMakrdown(child), `](${href})`);
      } else if (child.nodeName === "UL") {
        lines.push(toMakrdown(child));
      } else if (child.nodeName === "LI") {
        lines.push("- ", toMakrdown(child));
      }
    }
    return lines.join("").replaceAll("&nbsp;", " ");
  }

  return (
    <div className={styles.container}>
      <Tools
        currentStyles={currentStyles}
        updateCurrentStyles={setCurrentStyles}
      />
      <div
        ref={ref}
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
        onInput={() => {
          if (ref.current && previewRef.current) {
            const preview = previewRef.current as HTMLElement;
            preview.innerHTML = marked.parse(toMakrdown(ref.current)) as string;
            // preview.innerHTML = toMakrdown(ref.current);
          }
        }}
      />
      <div ref={previewRef} className={styles.preview} />
    </div>
  );
}
