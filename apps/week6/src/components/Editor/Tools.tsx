import {
  useEffect,
  useState,
  type Dispatch,
  type MouseEventHandler,
  type ReactNode,
  type SetStateAction,
} from "react";
import BoldIcon from "../icons/BoldIcon";
import ItalicIcon from "../icons/ItalicIcon";
import LinkIcon from "../icons/LinkIcon";
import UnorderedListIcon from "../icons/UnorderedListIcon";
import styles from "./Editor.module.css";
import { COMMAND } from "./constants";
import LinkOffIcon from "../icons/LinkOffIcon";

interface ButtonProps {
  isSelected?: boolean | string;
  onClick: MouseEventHandler<HTMLButtonElement>;
  children: ReactNode;
}

function Button({ isSelected = false, onClick, children }: ButtonProps) {
  const style = {
    backgroundColor: "rgba(255, 255, 255, 0)",
  };
  if (isSelected) style.backgroundColor = "#E0E0E0";
  return (
    <button style={style} onClick={onClick}>
      {children}
    </button>
  );
}

interface Props {
  currentStyles: Record<string, boolean | string>;
  updateCurrentStyles: Dispatch<
    SetStateAction<Record<string, boolean | string>>
  >;
}

export default function Tools({ currentStyles, updateCurrentStyles }: Props) {
  const [linkURL, setLinkURL] = useState("");
  const currentLinkURL = currentStyles[COMMAND.LINK] as string;

  useEffect(() => {
    if (currentLinkURL) {
      setLinkURL(currentLinkURL);
    }
  }, [currentLinkURL]);

  const handleClickTool = (command: string) => {
    if (command === COMMAND.LINK) {
      document.execCommand(command, false, linkURL);
      updateCurrentStyles((prev) => ({
        ...prev,
        [command]: linkURL,
      }));
    } else if (command === COMMAND.UNLINK) {
      document.execCommand(command, false, "false");
      updateCurrentStyles((prev) => ({
        ...prev,
        [command]: false,
      }));
      setLinkURL("");
    } else {
      document.execCommand(command);
      updateCurrentStyles((prev) => ({
        ...prev,
        [command]: !currentStyles[command],
      }));
    }
  };

  return (
    <div className={styles.tools}>
      <Button
        isSelected={currentStyles[COMMAND.BOLD]}
        onClick={() => handleClickTool(COMMAND.BOLD)}
      >
        <BoldIcon />
      </Button>
      <Button
        isSelected={currentStyles[COMMAND.ITALIC]}
        onClick={() => handleClickTool(COMMAND.ITALIC)}
      >
        <ItalicIcon />
      </Button>
      <Button
        isSelected={currentStyles[COMMAND.UNORDERED_LIST]}
        onClick={() => handleClickTool(COMMAND.UNORDERED_LIST)}
      >
        <UnorderedListIcon />
      </Button>
      <Button
        isSelected={currentStyles[COMMAND.LINK]}
        onClick={() => handleClickTool(COMMAND.LINK)}
      >
        <LinkIcon />
      </Button>
      <input
        type="text"
        value={linkURL}
        onChange={(e) => setLinkURL(e.target.value)}
        placeholder="Link URL"
      />
      <Button onClick={() => handleClickTool(COMMAND.UNLINK)}>
        <LinkOffIcon />
      </Button>
    </div>
  );
}
