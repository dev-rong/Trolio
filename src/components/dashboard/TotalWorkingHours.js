import React from 'react';
import { Bar } from 'react-chartjs-2';
const TotalWorkingHours = ({ rangedJobs, rangedJobB }) => {
  const filteredJobs = rangedJobs.map((job) =>
    Math.round(job.fields['workingHours'])
  );
  const totalWorkingHours = filteredJobs.reduce((x, y) => x + y, 0);
  const filteredJobsB = rangedJobB.map((job) =>
    Math.round(job.fields['workingHours'])
  );
  const totalWorkingHoursB = filteredJobsB.reduce((x, y) => x + y, 0);
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
        text: 'Total WorkingHours(hrs)',
      },
    },
  };

  const data = {
    labels: [''],
    datasets: [
      {
        label: 'A',
        data: [totalWorkingHours],
        backgroundColor: '#F38787',
      },
      {
        label: 'B',
        data: [totalWorkingHoursB],
        backgroundColor: '#74ABE2',
      },
    ],
  };
  return <Bar options={options} data={data} />;
};

export default TotalWorkingHours;
