import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface BarChartProps {
  scores: { [dimension: string]: number };
  title?: string;
}

const BarChart: React.FC<BarChartProps> = ({ scores, title }) => {
  const data = {
    labels: Object.keys(scores),
    datasets: [
      {
        label: title || "Leadership Metrics",
        data: Object.values(scores),
        backgroundColor: "#003865"
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false
      },
      title: {
        display: !!title,
        text: title
      }
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-6">
      <Bar data={data} options={options} />
    </div>
  );
};

export default BarChart;