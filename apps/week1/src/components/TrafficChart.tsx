import { useEffect } from "react";
import Chart from "chart.js/auto";

const CANVAS_ID = "chart";

export interface ChartData {
  labels: string[];
  label: string;
  data: number[];
}

interface CreateChartProps extends ChartData {
  canvas: HTMLCanvasElement;
}

function createChart({ canvas, label, labels, data }: CreateChartProps) {
  new Chart(canvas, {
    type: "bar",
    data: {
      labels,
      datasets: [
        {
          label,
          data,
          borderWidth: 1,
        },
      ],
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  });
}

interface Props {
  chartData: ChartData;
}

export default function TrafficChart({ chartData }: Props) {
  useEffect(() => {
    const canvas = document.getElementById(CANVAS_ID) as HTMLCanvasElement;
    if (!canvas) return;

    const chart = Chart.getChart(CANVAS_ID);
    if (chart) {
      chart.data.labels = chartData.labels;
      chart.data.datasets[0].data = chartData.data;
      chart.update();
      return;
    }

    createChart({
      canvas,
      label: chartData.label,
      labels: chartData.labels,
      data: chartData.data,
    });
  }, [chartData]);

  return <canvas id={CANVAS_ID}></canvas>;
}
