import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
ChartJS.register(ArcElement, Tooltip, Legend);
const CategoryChart = ({ jobs, rangedJobs, rangedJobB }) => {
  const category = jobs.map((job) => job.fields['category'][0]);
  const categoryA = rangedJobs.map((job) => job.fields['category'][0]);
  const categoryB = rangedJobB.map((job) => job.fields['category'][0]);
  const categoryArray = [...new Set(category)];
  let arrA = [];
  let arrB = [];
  for (let ele of categoryArray) {
    arrA.push(categoryA.filter((type) => type === ele).length);
  }
  for (let ele of categoryArray) {
    arrB.push(categoryB.filter((type) => type === ele).length);
  }
  const data = {
    labels: [categoryArray.map((ele) => ele)].flat(),
    datasets: [
      {
        label: 'A',
        data: arrA,
        backgroundColor: ['#FD625E', '#F2C80F', '#01B8AA', '#D3BDEB'],
      },
      {
        label: 'B',
        data: arrB,
        backgroundColor: ['#FD625E', '#F2C80F', '#01B8AA', '#D3BDEB'],
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
        text: 'Category',
      },
    },
  };
  return (
    <>
      <Doughnut width={100} height={50} options={options} data={data} />
    </>
  );
};
export default CategoryChart;
