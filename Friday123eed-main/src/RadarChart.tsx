import React from "react";
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
} from "chart.js";
import { Radar } from "react-chartjs-2";

ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend);

interface RadarChartProps {
  scores: { [dimension: string]: number };
  title?: string;
}

const RadarChart: React.FC<RadarChartProps> = ({ scores, title }) => {
  const data = {
    labels: Object.keys(scores),
    datasets: [
      {
        label: title || "Radar Profile",
        data: Object.values(scores),
        backgroundColor: "rgba(0, 145, 218, 0.2)",
        borderColor: "#0091DA",
        borderWidth: 2
      }
    ]
  };

  return (
    <div className="max-w-2xl mx-auto mt-6">
      <Radar data={data} />
    </div>
  );
};

export default RadarChart;