import { useEffect, useState } from 'react';
import Chart from 'chart.js/auto';

import styles from './TrafficChart.module.css';

export interface ChartData {
  labels: string[];
  label: string;
  data: number[];
}

interface Filter {
  period: number;
}

interface Props {
  chartData: ChartData;
}

function createChart({ canvas, label, labels, data }) {
  new Chart(canvas, {
    type: 'bar',
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

export default function TrafficChart({ chartData }: Props) {
  const [filter, setFilter] = useState<Filter>({ period: 1 });

  useEffect(() => {
    const canvas = document.getElementById(
      'traffic-chart'
    ) as HTMLCanvasElement;
    if (!canvas) return;

    const total = chartData.data.length;
    const labels = chartData.labels.slice(total - filter.period);
    const data = chartData.data.slice(total - filter.period);

    const chart = Chart.getChart('traffic-chart');
    if (chart) {
      chart.data.labels = labels;
      chart.data.datasets[0].data = data;
      chart.update();
      return;
    }

    createChart({ canvas, label: chartData.label, labels, data });
  }, [filter.period, chartData]);

  return (
    <div className={styles.container}>
      <div className={styles.filterContainer}>
        <select onChange={(e) => {
          setFilter((prev) => {
            return {
              ...prev,
              period: +e.target.value,
            }
          });
        }}>
          <option value={1}>오늘</option>
          <option value={7}>7일</option>
          <option value={30}>30일</option>
          <option value={chartData.data.length}>전체</option>
        </select>
      </div>
      <canvas id="traffic-chart"></canvas>
    </div>
  );
}
