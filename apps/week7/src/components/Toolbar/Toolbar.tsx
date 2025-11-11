import React from "react";
import styles from "./Toolbar.module.css";
import { socket } from "../../socket";

interface ToolbarProps {
  color: string;
  setColor: (color: string) => void;
  lineWidth: number;
  setLineWidth: (width: number) => void;
  connected: boolean;
}

const Toolbar: React.FC<ToolbarProps> = ({
  color,
  setColor,
  lineWidth,
  setLineWidth,
  connected,
}) => {
  return (
    <div className={styles.container}>
      <label>
        Color:{" "}
        <input
          type="color"
          value={color}
          onChange={(e) => setColor(e.target.value)}
        />
      </label>
      <label>
        Width:{" "}
        <input
          type="range"
          min="1"
          max="20"
          value={lineWidth}
          onChange={(e) => setLineWidth(Number(e.target.value))}
        />
      </label>
      <label>
        {connected ? (
          <>
            <button type="button" onClick={() => socket.disconnect()}>
              끊기
            </button>
            <button
              type="button"
              onClick={() => {
                socket.emit("undo");
              }}
            >
              되돌리기
            </button>
          </>
        ) : (
          <button type="button" onClick={() => socket.connect()}>
            연결
          </button>
        )}
      </label>
    </div>
  );
};

export default Toolbar;
