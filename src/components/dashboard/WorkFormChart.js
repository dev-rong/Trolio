import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
ChartJS.register(ArcElement, Tooltip, Legend);
const WorkFormChart = ({ rangedJobs, rangedJobB }) => {
  const form = rangedJobs.map((job) => job.fields['form'][0]);
  const numOfSUB = form.filter((type) => type === 'SUB').length;
  const numOfDUB = form.filter((type) => type === 'DUB').length;
  const formB = rangedJobB.map((job) => job.fields['form'][0]);
  const numOfSUBB = formB.filter((type) => type === 'SUB').length;
  const numOfDUBB = formB.filter((type) => type === 'DUB').length;
  const data = {
    labels: ['SUB', 'DUB'],
    datasets: [
      {
        label: 'A',
        data: [numOfSUB, numOfDUB],
        backgroundColor: ['#fea780', '#2191CF'],
      },
      {
        label: 'B',
        data: [numOfSUBB, numOfDUBB],
        backgroundColor: ['#fea780', '#2191CF'],
      },
    ],
  };
  const options = {
    maintainAspectRatio: false,
    responsive: true,
    plugins: {
      datalabels: {
        labels: {
          name: {
            align: 'top',
            font: { size: 12 },
            color: 'black',
            formatter: function (value, ctx) {
              const label = ctx.chart.data.labels[ctx.dataIndex];
              if (ctx.dataset.data[ctx.dataIndex] === 0) return null;
              if (ctx.datasetIndex === 0) return 'A\n' + label;
              if (ctx.datasetIndex === 1) return 'B\n' + label;
            },
          },
          value: {
            align: 'bottom',
            borderColor: 'black',
            backgroundColor: 'white',
            borderWidth: 1,
            borderRadius: 10,
            formatter: function (value, ctx) {
              if (ctx.dataset.data[ctx.dataIndex] === 0) return null;
            },
          },
        },
      },
      legend: {
        position: 'top',
        labels: {
          generateLabels: function (chart) {
            const original =
              ChartJS.overrides.pie.plugins.legend.labels.generateLabels;
            const labelsOriginal = original.call(this, chart);
            return labelsOriginal;
          },
        },
      },
      tooltip: {
        callbacks: {},
      },
      title: {
        display: true,
        text: 'Form',
      },
    },
  };
  return (
    <>
      <Pie width={100} height={50} options={options} data={data} />
    </>
  );
};
export default WorkFormChart;
