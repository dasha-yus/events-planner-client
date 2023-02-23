import React, { useState, useEffect } from "react";
import { Chart } from "primereact/chart";

const IncomePerPeriod = () => {
  const [chartData, setChartData] = useState({});
  const [chartOptions, setChartOptions] = useState({});

  useEffect(() => {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColorSecondary = documentStyle.getPropertyValue("--primary-100");
    const surfaceBorder = documentStyle.getPropertyValue("--primary-200");
    const data = {
      labels: [
        "Март",
        "Апрель",
        "Май",
        "Июнь",
        "Июль",
        "Август",
        "Сентябрь",
        "Октябрь",
        "Ноябрь",
        "Декабрь",
        "Январь",
        "Февраль",
      ],
      datasets: [
        {
          data: [65, 59, 80, 81, 56, 63, 54, 80, 75, 62, 77, 92],
          fill: true,
          borderColor: documentStyle.getPropertyValue("--teal-400"),
          tension: 0.4,
        },
      ],
    };
    const options = {
      maintainAspectRatio: false,
      aspectRatio: 0.6,
      plugins: {
        legend: {
          display: false,
        },
      },
      scales: {
        x: {
          ticks: {
            color: textColorSecondary,
          },
          grid: {
            color: surfaceBorder,
          },
        },
        y: {
          ticks: {
            color: textColorSecondary,
          },
          grid: {
            color: surfaceBorder,
          },
        },
      },
    };

    setChartData(data);
    setChartOptions(options);
  }, []);

  return (
    <div className="block income-per-period">
      <div className="need-flex">
        <h2 className="mb-3">Доход за период: 01/03/2022 - 01/03/2023</h2>
        <i className="pi pi-cog" style={{ fontSize: '1.5rem' }}></i>
      </div>
      <div className="income-per-period_chart">
        <Chart type="line" data={chartData} options={chartOptions} />
      </div>
    </div>
  );
};

export default IncomePerPeriod;
