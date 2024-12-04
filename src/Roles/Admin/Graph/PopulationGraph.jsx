import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend);

const PopulationGraph = () => {
  const [graphData, setGraphData] = useState({
    labels: ["2020", "2021", "2022", "2023", "2024"], // Initial X-axis labels
    datasets: [
      {
        label: "Population Growth",
        data: [1000, 1200, 1500, 1800, 2100], // Initial data
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        fill: true,
        tension: 0.4, // Smooth curve
      },
    ],
  });

  useEffect(() => {
    const fetchRealTimeData = async () => {
      // Simulate fetching data from an API (replace with actual API endpoint)
      const response = await fetch("/api/population"); // Example API endpoint
      const data = await response.json();

      // Assume the API returns something like:
      // { years: ["2020", "2021", "2022", "2023", "2024"], population: [1000, 1200, 1500, 1800, 2100] }

      setGraphData({
        labels: data.years, // Update X-axis labels
        datasets: [
          {
            label: "Population Growth",
            data: data.population, // Update data points
            borderColor: "rgba(75, 192, 192, 1)",
            backgroundColor: "rgba(75, 192, 192, 0.2)",
            fill: true,
            tension: 0.4,
          },
        ],
      });
    };

    fetchRealTimeData();

    // Optional: Set an interval to update data periodically (e.g., every 10 seconds)
    const interval = setInterval(() => {
      fetchRealTimeData();
    }, 10000);

    // Cleanup interval on component unmount
    return () => clearInterval(interval);
  }, []);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      tooltip: {
        mode: "index",
        intersect: false,
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Year",
        },
      },
      y: {
        title: {
          display: true,
          text: "Population (in thousands)",
        },
      },
    },
  };

  return (
    <div style={{ width: "100%", height: "200px", margin: "20px auto" }}>
      <Line data={graphData} options={options} />
    </div>
  );
};

export default PopulationGraph;
