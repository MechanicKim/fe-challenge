import { useEffect } from "react";
import Chart from "chart.js/auto";
import styles from "./Chart.module.css";

const CANVAS_ID = "chart";

const themeColors = {
  light: {
    text: '#333333',
    grid: '#E0E0E0',
    tooltip: {
      bg: 'rgba(0, 0, 0, 0.8)',
      title: '#FFFFFF',
      body: '#FFFFFF',
    },
  },
  dark: {
    text: '#FFFFFF',
    grid: '#404040',
    tooltip: {
      bg: 'rgba(255, 255, 255, 0.8)',
      title: '#1E1E1E',
      body: '#1E1E1E',
    },
  },
};

export interface ChartData {
  labels: string[];
  label: string;
  data: number[];
}

interface CreateChartProps extends ChartData {
  canvas: HTMLCanvasElement;
}

function createChart({ canvas, label, labels, data }: CreateChartProps) {
  return new Chart(canvas, {
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
      plugins: {
        tooltip: {
          callbacks: {
            label: (context) => {
              return `${context.formattedValue}명`;
            },
          },
        },
      },
    },
  });
}

interface Props {
  chartData: ChartData;
  theme: "light" | "dark";
}

export default function TrafficChart({ chartData, theme }: Props) {
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

  useEffect(() => {
    const colors = themeColors[theme];

    Chart.defaults.color = colors.text;
    Chart.defaults.borderColor = colors.grid;
    
    const chart = Chart.getChart(CANVAS_ID);
    if (chart) {
      const scales = chart.options.scales;
      if (scales) {
        if (scales.x) {
          if (scales.x.grid) scales.x.grid.color = colors.grid;
          if (scales.x.ticks) scales.x.ticks.color = colors.text;
        }
        if (scales.y) {
          if (scales.y.grid) scales.y.grid.color = colors.grid;
          if (scales.y.ticks) scales.y.ticks.color = colors.text;
        }
      }

      const plugins = chart.options.plugins;
      if (plugins && plugins.tooltip) {
        plugins.tooltip.backgroundColor = colors.tooltip.bg;
        plugins.tooltip.titleColor = colors.tooltip.title;
        plugins.tooltip.bodyColor = colors.tooltip.body;
      }
    }

    if (chart) chart.update();
  }, [theme]);

  return <canvas id={CANVAS_ID} className={`${styles.chart} ${styles[theme]}`}></canvas>;
}
