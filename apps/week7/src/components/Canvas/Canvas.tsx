import { useRef, useEffect } from "react";

interface CanvasProps {
  color: string;
  lineWidth: number;
}

const Canvas = ({ color, lineWidth }: CanvasProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isDrawing = useRef(false);

  // 1. 캔버스 초기화 및 리사이즈 로직
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // 챌린지 요구사항: 반응형 캔버스
    // 부모 요소의 크기에 맞춰 캔버스의 해상도와 뷰포트가 자동으로 조정되도록 합니다.
    const resizeCanvas = () => {
      const parent = canvas.parentElement;
      if (parent) {
        // 디바이스 픽셀 비율을 고려하여 선명하게 렌더링합니다.
        // 리사이즈 시 기존 드로잉이 유지되지 않는 문제를 해결하기 위해
        // 현재 캔버스의 상태를 저장하고 리사이즈 후 복원합니다.
        const context = canvas.getContext("2d");
        const imageData = context?.getImageData(0, 0, canvas.width, canvas.height);

        const dpr = window.devicePixelRatio || 1;
        canvas.width = parent.clientWidth * dpr;
        canvas.height = parent.clientHeight * dpr;
        context?.scale(dpr, dpr);
        if (context && imageData) {
          context.putImageData(imageData, 0, 0);
        }
      }
    };

    const resizeObserver = new ResizeObserver(resizeCanvas);
    if (canvas.parentElement) {
      resizeObserver.observe(canvas.parentElement);
    }
    resizeCanvas(); // 초기 사이즈 설정
    
    const context = canvas.getContext("2d");
    if (context) {
      context.lineCap = "round";
    }

    return () => {
      if (canvas.parentElement) {
        resizeObserver.unobserve(canvas.parentElement);
      }
    };
  }, []);

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
    };

    const draw = (event: MouseEvent) => {
      if (!isDrawing.current) return;
      context.lineTo(event.offsetX, event.offsetY);
      context.stroke();
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
