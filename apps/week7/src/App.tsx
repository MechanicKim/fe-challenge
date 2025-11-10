import { useState } from "react";
import Canvas from "./components/Canvas/Canvas";
import Toolbar from "./components/Toolbar/Toolbar";

export default function App() {
  const [color, setColor] = useState("#000000");
  const [lineWidth, setLineWidth] = useState(5);
  const [userID, setUserID] = useState("ananymous");
  const [connected, setConnected] = useState(false);

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        position: "relative",
      }}
    >
      <Toolbar
        color={color}
        setColor={setColor}
        lineWidth={lineWidth}
        setLineWidth={setLineWidth}
        userID={userID}
        setUserID={setUserID}
        connected={connected}
      />
      <Canvas color={color} lineWidth={lineWidth} userID={userID} setConnected={setConnected} />
    </div>
  );
}
