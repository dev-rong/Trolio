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
import { Bar } from 'react-chartjs-2';
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);
export const options = {
  responsive: true,
  interaction: {
    mode: 'index',
    intersect: false,
  },
  scales: {
    x: {
      stacked: true,
    },
    y: {
      stacked: true,
    },
  },
};
const SecondHalfIncome = ({ jobs }) => {
  const options = {
    responsive: true,
  };

  const getIncomeOfSpecificYear = (year, month) => {
    if (month < 10) {
      month = '0' + month;
    }
    return jobs.filter(
      (job) =>
        job.fields['deadline'].slice(0, 4) === year.toString() &&
        job.fields['deadline'].slice(5, 7) === month.toString()
    );
  };

  const eachIncomeOfLastYear = [7, 8, 9, 10, 11, 12].map((ele) =>
    getIncomeOfSpecificYear(new Date().getFullYear() - 1, ele)
  );
  const eachIncomeOfThisYear = [7, 8, 9, 10, 11, 12].map((ele) =>
    getIncomeOfSpecificYear(new Date().getFullYear(), ele)
  );

  const eachTotalIncomeOfLastYear = eachIncomeOfLastYear.map((ele) =>
    ele
      .map((job) => Math.round(job.fields['afterTax']))
      .reduce((x, y) => x + y, 0)
  );
  const eachTotalIncomeOfThisYear = eachIncomeOfThisYear.map((ele) =>
    ele
      .map((job) => Math.round(job.fields['afterTax']))
      .reduce((x, y) => x + y, 0)
  );

  const labels = ['July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const data = {
    labels,
    datasets: [
      {
        datalabels: {
          align: 'center',
          offset: 1,
          anchor: 'center',
          borderWidth: 0,
          font: { size: '12px', family: 'Nunito' },
          formatter: function (value) {
            if (value >= 1000000) return Math.round(value / 1000000) + 'M';
            else if (value >= 1000 && value < 1000000)
              return Math.round(value / 1000) + 'k';
          },
        },
        label: 'Last Year',
        data: eachTotalIncomeOfLastYear,
        borderColor: '#ffd282',
        backgroundColor: '#ffd282',
      },
      {
        datalabels: {
          align: 'end',
          offset: 1,
          anchor: 'center',
          borderWidth: 0,
          font: { size: '12px' },
          formatter: function (value) {
            if (value >= 1000000) return Math.round(value / 1000000) + 'M';
            else if (value >= 1000 && value < 1000000)
              return Math.round(value / 1000) + 'k';
          },
        },
        label: 'This Year',
        data: eachTotalIncomeOfThisYear,
        borderColor: '#b57dc9',
        backgroundColor: '#b57dc9',
      },
    ],
  };
  return <Bar options={options} data={data} />;
};
export default SecondHalfIncome;
