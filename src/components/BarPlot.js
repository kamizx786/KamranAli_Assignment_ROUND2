import React from 'react';
import { Bar } from 'react-chartjs-2';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler
);
const options = {
  responsive: true,
  backgroundColor: " #F7F7F7",
};
const BarPlot = (props) => {
  const labels = props.labels;
  const data = {
    labels,
    datasets: [
      {
        label: 'Top 10 Products',
        data: props.data,
        backgroundColor: '#1C69D4',
      },
    ],
  };

  return <Bar data={data} options={options} />;
}

export default BarPlot;
