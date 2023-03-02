import { ArcElement, Chart as ChartJS, Legend, Tooltip } from 'chart.js';
import React from 'react';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = ({ outputData }) => {
  //sort highest 5 Prices
  const top10Prices = outputData && outputData.CSVdata && outputData.CSVdata.length
    && outputData.CSVdata
      .map(product => product.Price)
      .sort((a, b) => b - a)
      .slice(0, 5);
  const top10 = outputData && outputData.CSVdata && outputData.CSVdata.length
    && outputData.CSVdata.filter(product => top10Prices.includes(product.Price));
  const labels = top10 &&
    top10.length && top10.map((c) => c.Product);
  const prices = top10 &&
    top10.length && top10.map((c) => c.Price);
  //Data For Chart
  const data = {
    labels,
    datasets: [
      {
        label: 'Top 5 Products',
        data: prices,
        backgroundColor: ["#1C69D4", "#5997ED", "#9BC1F6", "#408EF9", "#006CFF"],
        borderColor: ["#1C69D4", "#5997ED", "#9BC1F6", "#408EF9", "#006CFF"]

      },
    ],
  };

  return <Pie data={data} />;
}
export default PieChart;