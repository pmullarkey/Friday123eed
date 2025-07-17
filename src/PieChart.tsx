import React from "react";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

interface PieChartProps {
  data: { [subcategory: string]: number };
  title?: string;
}

const PieChart: React.FC<PieChartProps> = ({ data, title }) => {
  const chartData = {
    labels: Object.keys(data),
    datasets: [
      {
        label: "Substyle Distribution",
        data: Object.values(data),
        backgroundColor: [
          "#003865",
          "#0091DA",
          "#00B2A9"
        ]
      }
    ]
  };

  return (
    <div className="max-w-xl mx-auto mt-6">
      <h3 className="text-center font-semibold mb-2">{title}</h3>
      <Pie data={chartData} />
    </div>
  );
};

export default PieChart;