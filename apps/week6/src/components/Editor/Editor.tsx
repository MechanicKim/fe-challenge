import { useState } from 'react';
import styles from './Editor.module.css';
import Tools from './Tools';

interface ToolStatus {
  bold: boolean;
  italic: boolean;
  link: boolean;
  unorderedList: boolean;
}

export default function Editor() {
  // const [toolStatus, setToolStatus] = useState({
  //   bold: false,
  //   italic: false,
  //   link: false,
  //   unorderedList: false,
  // });

  return (
    <div className={styles.container}>
      <Tools />
      <div
        className={styles.editor}
        contentEditable
        onKeyUp={(e) => {
          if (!['ArrowUp', 'ArrowRight', 'ArrowDown', 'ArrowLeft'].includes(e.key)) return;
          
          const selection = window.getSelection();
          if (!selection || selection.rangeCount === 0) return;

          const range = selection.getRangeAt(0);
          const container = range.commonAncestorContainer;

          console.dir(range, container);
        }}
        onInput={(e) => {
          // const div = e.target as HTMLDivElement;
          // console.log(div.innerHTML);
        }}
      />
    </div>
  );
}
