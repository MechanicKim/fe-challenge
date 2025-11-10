let resizeObserver: ResizeObserver | null = null;

function resizeCanvas(canvas: HTMLCanvasElement) {
  const parent = canvas.parentElement;
  if (parent) {
    // 디바이스 픽셀 비율을 고려하여 선명하게 렌더링합니다.
    const context = canvas.getContext("2d", { willReadFrequently: true });
    const imageData = context?.getImageData(0, 0, canvas.width, canvas.height);

    if (context && imageData) {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = parent.clientWidth * dpr;
      canvas.height = parent.clientHeight * dpr;
      context.scale(dpr, dpr);
      context.putImageData(imageData, 0, 0);
    }
  }
}

export function initCanvas(canvas: HTMLCanvasElement) {
  // 챌린지 요구사항: 반응형 캔버스
  // 부모 요소의 크기에 맞춰 캔버스의 해상도와 뷰포트가 자동으로 조정되도록 합니다.
  resizeObserver = new ResizeObserver(() => resizeCanvas(canvas));
  if (canvas.parentElement) {
    resizeObserver.observe(canvas.parentElement);
  }
  resizeCanvas(canvas);

  const context = canvas.getContext("2d");
  if (context) context.lineCap = "round";

  return resizeObserver;
}

export function destroyCanvas(canvas: HTMLCanvasElement) {
  if (resizeObserver && canvas.parentElement) {
    resizeObserver.unobserve(canvas.parentElement);
  }
}

export interface LineObject {
  id: string;
  userID: string;
  timestamp: number;
  color: string;
  lineWidth: number;
  points: { x: number; y: number }[];
}

export function drawLine(line: LineObject, context: CanvasRenderingContext2D) {
  // 스타일 적용
  context.strokeStyle = line.color;
  context.lineWidth = line.lineWidth;
  context.lineCap = "round";

  // 선 그리기 시작
  context.beginPath();
  if (line.points.length > 0) {
    context.moveTo(line.points[0].x, line.points[0].y);

    for (let i = 1; i < line.points.length; i++) {
      context.lineTo(line.points[i].x, line.points[i].y);
    }
  }

  // 실제로 캔버스에 선 긋기
  context.stroke();
}

export function redrawCanvas(
  allDrawings: LineObject[],
  canvas: HTMLCanvasElement
) {
  const context = canvas.getContext("2d");
  if (!context) return;

  context.clearRect(0, 0, canvas.width, canvas.height);
  allDrawings.forEach((line) => {
    drawLine(line, context);
  });
}

export function clearCanvas(canvas: HTMLCanvasElement) {
  const context = canvas.getContext("2d");
  if (!context) return;

  context.clearRect(0, 0, canvas.width, canvas.height);
}
