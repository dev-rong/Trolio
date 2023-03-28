import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { Bar } from 'react-chartjs-2';
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartDataLabels
);
ChartJS.defaults.set('plugins.datalabels', {
  color: 'black',
  font: {
    family: 'Nunito',
    weight: 'bold',
    size: '12px',
  },
});
const TotalWorks = ({ rangedJobs, rangedJobB }) => {
  const countedWorks = rangedJobs.length;
  const countedWorkB = rangedJobB.length;
  const options = {
    indexAxis: 'y',
    elements: {
      bar: {
        borderWidth: 2,
      },
    },
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Total Works',
      },
    },
  };

  const data = {
    labels: [''],
    datasets: [
      {
        label: 'A',
        data: [countedWorks],
        backgroundColor: '#F38787',
      },
      {
        label: 'B',
        data: [countedWorkB],
        backgroundColor: '#74ABE2',
      },
    ],
  };
  return <Bar options={options} data={data} />;
};
export default TotalWorks;
