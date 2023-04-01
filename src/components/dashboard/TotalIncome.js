import React from 'react';
import { Bar } from 'react-chartjs-2';
const TotalIncome = ({ rangedJobs, rangedJobB }) => {
  const totalIncome = rangedJobs
    .map((job) => Math.round(job.fields['afterTax']))
    .reduce((x, y) => x + y, 0);
  const totalIncomeB = rangedJobB
    .map((job) => Math.round(job.fields['afterTax']))
    .reduce((x, y) => x + y, 0);
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
        text: 'Total Income(won)',
      },
    },
  };

  const data = {
    labels: [''],
    datasets: [
      {
        label: 'A',
        data: [totalIncome],
        backgroundColor: '#F38787',
      },
      {
        label: 'B',
        data: [totalIncomeB],
        backgroundColor: '#74ABE2',
      },
    ],
  };
  return <Bar options={options} data={data} />;
};
export default TotalIncome;
