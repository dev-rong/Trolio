import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
ChartJS.register(ArcElement, Tooltip, Legend);
const JobTypeChart = ({ rangedJobs, rangedJobB }) => {
  const type = rangedJobs.map((job) => job.fields['type'][0]);
  const numOfTrans = type.filter((type) => type === 'TRS').length;
  const numOfQC = type.filter((type) => type === 'QC').length;
  const typeB = rangedJobB.map((job) => job.fields['type'][0]);
  const numOfTransB = typeB.filter((type) => type === 'TRS').length;
  const numOfQCB = typeB.filter((type) => type === 'QC').length;
  const data = {
    labels: ['Trans', 'QC'],
    datasets: [
      {
        label: 'A',
        data: [numOfTrans, numOfQC],
        backgroundColor: ['#CE7080', '#2CDA9D'],
      },
      {
        label: 'B',
        data: [numOfTransB, numOfQCB],
        backgroundColor: ['#CE7080', '#2CDA9D'],
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
      title: {
        display: true,
        text: 'Type',
      },
    },
  };
  return (
    <>
      <Pie width={100} height={50} options={options} data={data} />
    </>
  );
};
export default JobTypeChart;
