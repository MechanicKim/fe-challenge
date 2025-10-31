import BoldIcon from "../icons/BoldIcon";
import ItalicIcon from "../icons/ItalicIcon";
import LinkIcon from "../icons/LinkIcon";
import UnorderedListIcon from "../icons/UnorderedListIcon";
import styles from './Editor.module.css';

export default function Tools() {
  const handleClickTool = (command: string) => {
    const selection = window.getSelection();
    if (!selection || selection.rangeCount === 0) return;

    function formatText(originText: string) {
      if (command === 'bold') return `**${originText}**`;
      if (command === 'italic') return `_${originText}_`;
      else if (command === 'link') return `[${originText}]()`;
      else if (command === 'unorderedList') return `- ${originText}`;
      return null;
    }

    const range = selection.getRangeAt(0);
    const { startOffset, endOffset } = range;
    if (startOffset === endOffset) return;

    console.log(startOffset, endOffset);

    const container = range.commonAncestorContainer;
    if (container.childNodes.length === 0 && container.textContent) {
      const originText = container.textContent.substring(startOffset, endOffset);
      const formattedText = formatText(originText);
      const start = container.textContent.substring(0, startOffset);
      const end = container.textContent.substring(endOffset);
      container.textContent = `${start}${formattedText}${end}`;
      range.collapse(false);
      return;
    }
    
    const last = container.childNodes.length - 1;
    [...container.childNodes].forEach((node, index) => {
      if (!node.textContent) return;
      if (index === 0) {
        const originText = node.textContent.substring(startOffset);
        const formattedText = formatText(originText);
        const start = node.textContent.substring(0, startOffset);
        node.textContent = `${start}${formattedText}`;
      } else if (index === last) {
        const originText = node.textContent.substring(0, endOffset);
        const formattedText = formatText(originText);
        const end = node.textContent.substring(endOffset);
        node.textContent = `${formattedText}${end}`;
      } else {
        node.textContent = formatText(node.textContent);
      }
    });
    range.collapse(false);
  };

  return (
    <div className={styles.tools}>
      <button onClick={() => handleClickTool('bold')}>
        <BoldIcon />
      </button>
      <button onClick={() => handleClickTool('italic')}>
        <ItalicIcon />
      </button>
      <button onClick={() => handleClickTool('link')}>
        <LinkIcon />
      </button>
      <button onClick={() => handleClickTool('unorderedList')}>
        <UnorderedListIcon />
      </button>
    </div>
  );
}