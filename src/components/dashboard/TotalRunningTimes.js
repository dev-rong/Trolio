import React from 'react';
import { Bar } from 'react-chartjs-2';
const TotalRunningTimes = ({ rangedJobs, rangedJobB }) => {
  const countedRunningTimes = rangedJobs.map((job) =>
    Math.round(job.fields['runtime'])
  );
  const totalRunningTimes = countedRunningTimes.reduce((x, y) => x + y, 0);
  const countedRunningTimesB = rangedJobB.map((job) =>
    Math.round(job.fields['runtime'])
  );
  const totalRunningTimesB = countedRunningTimesB.reduce((x, y) => x + y, 0);
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
        text: 'Total Running Times(min)',
      },
    },
  };

  const data = {
    labels: [''],
    datasets: [
      {
        label: 'A',
        data: [totalRunningTimes],
        backgroundColor: '#F38787',
      },
      {
        label: 'B',
        data: [totalRunningTimesB],
        backgroundColor: '#74ABE2',
      },
    ],
  };
  return <Bar options={options} data={data} />;
};
export default TotalRunningTimes;
