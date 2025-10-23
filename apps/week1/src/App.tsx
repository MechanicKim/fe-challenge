import { useEffect, useState } from 'react';
import './App.css';
import TrafficChart, { ChartData } from './components/TrafficChart';

interface Traffic {
  date: string;
  page_views: number;
  unique_visitors: number;
}

function App() {
  const [chartData, setChartData] = useState<ChartData | null>(null);

  useEffect(() => {
    fetch("/traffic.json")
      .then((response) => response.json())
      .then((result: Traffic[]) => {
        setChartData({
          labels: result.map((data) => data.date),
          data: result.map((data) => data.page_views),
          label: 'Daily Traffics',
        });
      });
  }, []);

  if (!chartData) return null;

  return (
    <TrafficChart chartData={chartData} />
  );
}

export default App;
