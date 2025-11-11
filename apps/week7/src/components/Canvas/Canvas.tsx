import { useRef, useEffect } from "react";
import { socket } from "../../socket";
import { clearCanvas, destroyCanvas, drawLine, initCanvas, redrawCanvas, type Drawings, type LineObject } from "./util";

interface CanvasProps {
  color: string;
  lineWidth: number;
  setConnected: (connected: boolean) => void;
}

const Canvas = ({ color, lineWidth, setConnected }: CanvasProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isDrawing = useRef(false);
  const lineObject = useRef<LineObject>({
    timestamp: 0,
    color,
    lineWidth,
    points: [],
  });
  const timerRef = useRef<number | number>(null);

  // 1. 캔버스 초기화 및 리사이즈 로직
  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) initCanvas(canvas);

    socket.on("connect", () => {
      if (socket.connected && socket.id) {
        setConnected(true);
      }
    });

    socket.on("initial-lines", (lines: Drawings) => {
      if (canvas) redrawCanvas(lines, canvas);
    });

    socket.on("draw-line", (line: LineObject) => {
      if (!canvas) return;
      const context = canvas.getContext("2d");
      if (context) drawLine(line, context);
    });

    socket.on("disconnect", () => {
      if (canvas) clearCanvas(canvas);
      setConnected(false);
    });

    return () => {
      if (canvas) {
        destroyCanvas(canvas);
        socket.off("connect");
        socket.off("initial-lines");
        socket.off("draw-line");
      }
    };
  }, [setConnected]);

  // 2. 드로잉 이벤트 핸들러 등록 로직
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext("2d");
    if (!context) return;

    // 챌린지 요구사항: 드로잉 로직
    const startDrawing = (event: MouseEvent) => {
      context.strokeStyle = color;
      context.lineWidth = lineWidth;
      isDrawing.current = true;
      context.beginPath();
      context.moveTo(event.offsetX, event.offsetY);

      if (socket.connected) {
        lineObject.current.color = color;
        lineObject.current.lineWidth = lineWidth;
        lineObject.current.timestamp = Date.now();
        lineObject.current.points = [{ x: event.offsetX, y: event.offsetY }];
      }
    };

    const draw = (event: MouseEvent) => {
      if (!isDrawing.current) return;
      context.lineTo(event.offsetX, event.offsetY);
      context.stroke();

      if (socket.connected) {
        lineObject.current.points.push({ x: event.offsetX, y: event.offsetY });
        
        if (timerRef.current) return;
        timerRef.current = setTimeout(() => {
          socket.emit("draw-line", lineObject.current);
          timerRef.current = null;
        }, 50);
      }
    };

    const stopDrawing = () => {
      isDrawing.current = false;
      context.closePath();
    };

    // 챌린지 요구사항: 마우스 이벤트 등록
    canvas.addEventListener("mousedown", startDrawing);
    canvas.addEventListener("mousemove", draw);
    canvas.addEventListener("mouseup", stopDrawing);
    canvas.addEventListener("mouseleave", stopDrawing);

    return () => {
      canvas.removeEventListener("mousedown", startDrawing);
      canvas.removeEventListener("mousemove", draw);
      canvas.removeEventListener("mouseup", stopDrawing);
      canvas.removeEventListener("mouseleave", stopDrawing);
    };
  }, [color, lineWidth]);

  return (
    <canvas
      ref={canvasRef}
      style={{ width: "100%", height: "100%", display: "block" }}
    />
  );
};

export default Canvas;
