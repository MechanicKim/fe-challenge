import { useEffect, useRef, useState } from "react";
import { marked } from "marked";
import styles from "./Editor.module.css";
import Tools from "./Tools";
import { COMMAND, SAVE_KEY } from "./constants";

type CurrentStyle = Record<string, boolean | string>;

function toMakrdown(dom: Node): string {
  const lines = [];
  const children = [...dom.childNodes];
  for (const child of children) {
    if (child.nodeName === "#text" && child.textContent) {
      const replaced = child.textContent
        .replace(/&/g, "\\&")
        .replace(/</g, "\\<")
        .replace(/>/g, "\\>")
        .replace(/\*/g, "\\*")
        .replace(/\[/g, "\\[")
        .replace(/\]/g, "\\]")
        .replace(/-/g, "\\-");

      lines.push(replaced);
    } else if (child.nodeName === "DIV") {
      lines.push("<br/>", toMakrdown(child));
    } else if (child.nodeName === "B") {
      lines.push("**", toMakrdown(child), "**");
    } else if (child.nodeName === "I") {
      lines.push("*", toMakrdown(child), "*");
    } else if (child.nodeName === "A") {
      const href = (child as HTMLAnchorElement).href;
      lines.push("[", toMakrdown(child), `](${href})`);
    } else if (child.nodeName === "UL") {
      lines.push(toMakrdown(child));
    } else if (child.nodeName === "LI") {
      lines.push("- ", toMakrdown(child));
    } else if (child.nodeName === "IMG") {
      const src = (child as HTMLImageElement).src;
      lines.push(`![${src}](${src})`);
    }
  }
  return lines.join("").replaceAll("&nbsp;", " ");
}

export default function Editor() {
  const [currentStyles, setCurrentStyles] = useState<CurrentStyle>({});
  const ref = useRef<HTMLDivElement | null>(null);
  const previewRef = useRef(null);

  useEffect(() => {
    if (ref.current && previewRef.current) {
      const html = window.localStorage.getItem(SAVE_KEY);
      if (html) ref.current.innerHTML = html;

      const preview = previewRef.current as HTMLElement;
      preview.innerHTML = marked.parse(toMakrdown(ref.current)) as string;
    }
  }, []);

  function updateCurrnetStyles(target: HTMLElement | null) {
    let current = target;

    const styles: CurrentStyle = {};
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
      } else if (tagName === "IMG") {
        const imageUrl = (current as HTMLImageElement).src;
        styles[COMMAND.IMAGE] = imageUrl;
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
        editor={ref.current}
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
          }
        }}
      />
      <div ref={previewRef} className={styles.preview} />
    </div>
  );
}
