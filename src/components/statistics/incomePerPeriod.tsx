import React, { useState, useEffect } from "react";
import { Chart } from "primereact/chart";
import { Dialog } from "primereact/dialog";
import { Calendar } from "primereact/calendar";
import { Button } from "primereact/button";
import {
  getMonthsBetweenTwoDates,
  subtractMonths,
  subtractYears,
} from "../../utils/date";
import { monthsNames } from "../../utils/months";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { getJsonValue } from "../../utils/localStorage";
import { CurrencyISO } from "../../utils/constants";

const IncomePerPeriod = () => {
  const [chartData, setChartData] = useState({});
  const [chartOptions, setChartOptions] = useState({});
  const [visible, setVisible] = useState(false);
  const currency = useSelector((state: RootState) => state.currency.value);
  const rates = getJsonValue("rates");
  // actual dates
  const [startDate, setStartDate] = useState(subtractYears(new Date(), 1));
  const [endDate, setEndDate] = useState(new Date());
  // temporary dates
  const [dateStart, setDateStart] = useState<any>(subtractYears(new Date(), 1));
  const [dateEnd, setDateEnd] = useState<any>(new Date());

  useEffect(() => {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColorSecondary = documentStyle.getPropertyValue("--primary-100");
    const surfaceBorder = documentStyle.getPropertyValue("--primary-200");
    const dateTo = new Date(endDate);
    const months = getMonthsBetweenTwoDates(
      startDate,
      subtractMonths(dateTo, 1)
    );
    const dataPerPeriod = [65, 59, 80, 81, 56, 63, 54, 80, 75, 62, 77, 92];
    const multiplier = rates && rates[currency];
    const data = {
      labels: months.map(
        (obj) => monthsNames[obj.month as keyof typeof monthsNames]
      ),
      datasets: [
        {
          data: dataPerPeriod.map((val) =>
            currency === CurrencyISO.BYN ? val : val * +(multiplier || 1)
          ),
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
  }, [endDate, startDate, currency]);

  const submitSettings = () => {
    setStartDate(dateStart);
    setEndDate(dateEnd);
    setVisible(false);
  };

  return (
    <div className="block income-per-period">
      <div className="need-flex">
        <h2>
          Доход за период: {startDate.toLocaleDateString("en-GB")} -{" "}
          {endDate.toLocaleDateString("en-GB")}
        </h2>
        <div
          className="income-per-period_settings"
          onClick={() => setVisible(true)}
        >
          <i className="pi pi-cog" style={{ fontSize: "1.5rem" }} />
        </div>
      </div>
      <div className="income-per-period_chart">
        <Chart type="line" data={chartData} options={chartOptions} />
      </div>
      <Dialog
        header="Период"
        visible={visible}
        onHide={() => setVisible(false)}
      >
        <div className="mb-4">
          <p>Дата начала:</p>
          <Calendar
            value={startDate}
            onChange={(e) => setDateStart(e.value)}
            showIcon
            dateFormat="dd/mm/yy"
          />
        </div>
        <div className="mb-5">
          <p>Дата окончания:</p>
          <Calendar
            value={endDate}
            onChange={(e) => setDateEnd(e.value)}
            showIcon
            dateFormat="dd/mm/yy"
          />
        </div>
        <div className="need-flex">
          <Button
            label="Отмена"
            severity="secondary"
            raised
            onClick={() => setVisible(false)}
          />
          <Button label="Применить" raised onClick={submitSettings} />
        </div>
      </Dialog>
    </div>
  );
};

export default IncomePerPeriod;
