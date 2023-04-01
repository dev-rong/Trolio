import React from 'react';
import { Bar } from 'react-chartjs-2';
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
const FirstHalfIncome = ({ jobs }) => {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Yearly Income(won)',
      },
    },
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
  const eachIncomeOfLastYear = [1, 2, 3, 4, 5, 6].map((ele) =>
    getIncomeOfSpecificYear(new Date().getFullYear() - 1, ele)
  );
  const eachIncomeOfThisYear = [1, 2, 3, 4, 5, 6].map((ele) =>
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
  const labels = ['Jan', 'Feb', 'March', 'April', 'May', 'June'];
  const data = {
    labels,
    datasets: [
      {
        datalabels: {
          align: 'end',
          offset: 1,
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
          align: 'bottom',
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
export default FirstHalfIncome;
