import { useEffect, useState } from 'react';
import TrafficChart, { ChartData } from './components/TrafficChart';
import ChartFilter from './components/ChartFilter';
import styles from './App.module.css';

interface Traffic {
  date: string;
  page_views: number;
  unique_visitors: number;
}

export interface Filter {
  period: number;
}

function App() {
  const [trafficData, setTrafficData] = useState<Traffic[] | null>(null);
  const [chartData, setChartData] = useState<ChartData | null>(null);
  const [filter, setFilter] = useState<Filter>({ period: 1 });

  useEffect(() => {
    fetch("/traffic.json")
      .then((response) => response.json())
      .then((result: Traffic[]) => {
        setTrafficData(result);
      });
  }, []);

  useEffect(() => {
    if (!trafficData) return;

    const sliceStart = trafficData.length - filter.period;
    const sliced = trafficData.slice(sliceStart);
    setChartData({
      labels: sliced.map(({ date }) => date),
      data: sliced.map(({ page_views }) => page_views),
      label: "Daily Traffic"
    });
  }, [trafficData, filter])

  if (!trafficData || !chartData) return null;

  return (
    <div className={styles.container}>
      <ChartFilter total={trafficData.length} onChange={setFilter} />
      <TrafficChart chartData={chartData} />
    </div>
  );
}

export default App;
