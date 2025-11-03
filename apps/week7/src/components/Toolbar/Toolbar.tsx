import React from "react";

interface ToolbarProps {
  color: string;
  setColor: (color: string) => void;
  lineWidth: number;
  setLineWidth: (width: number) => void;
}

const Toolbar: React.FC<ToolbarProps> = ({
  color,
  setColor,
  lineWidth,
  setLineWidth,
}) => {
  return (
    <div
      style={{
        position: "absolute",
        top: 10,
        left: 10,
        display: "flex",
        gap: "10px",
        padding: "10px",
        backgroundColor: "rgba(255, 255, 255, 0.8)",
        borderRadius: "8px",
        boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
      }}
    >
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
    </div>
  );
};

export default Toolbar;
