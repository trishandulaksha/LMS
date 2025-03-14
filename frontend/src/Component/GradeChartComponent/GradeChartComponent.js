import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register the necessary Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function GradeChartComponent({ subjects }) {
  const data = {
    labels: subjects.map((subject) => subject.courseCode),
    datasets: [
      {
        label: "Final Marks",
        data: subjects.map((subject) => subject.finalMarks),
        backgroundColor: ["#FFCE56", "#FF6384", "#36A2EB"],
        borderColor: ["#FFCE56", "#FF6384", "#36A2EB"],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Subject Marks Distribution",
      },
    },
  };

  return <Bar data={data} options={options} />;
}

export default GradeChartComponent;
