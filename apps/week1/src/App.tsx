import { useEffect, useState } from "react";
import TrafficChart, { type ChartData } from "./components/TrafficChart";
import ChartFilter from "./components/ChartFilter";
import styles from "./App.module.css";

interface Traffic {
  date: string;
  count: number;
}

interface TrafficResponse {
  success: boolean;
  data: Traffic[];
  error?: string;
}

export interface Filter {
  period: number;
  theme: "light" | "dark";
}

function App() {
  const [chartData, setChartData] = useState<ChartData | null>(null);
  const [filter, setFilter] = useState<Filter>({ period: 1, theme: "light" });

  useEffect(() => {
    const url = `http://localhost:3000/api/week1/traffic?period=${filter.period}`;
    fetch(url)
      .then((response) => response.json())
      .then((result: TrafficResponse) => {
        if (!result.success) {
          console.error(result.error);
          return;
        }

        if (result.data.length > 0) {
          setChartData({
            labels: result.data.map(({ date }) => date),
            data: result.data.map(({ count }) => count),
            label: "Daily Traffic",
          });
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, [filter.period]);

  if (!chartData) return null;

  return (
    <div className={styles.container}>
      <ChartFilter filter={filter} onChange={setFilter} />
      <TrafficChart chartData={chartData} theme={filter.theme} />
    </div>
  );
}

export default App;
