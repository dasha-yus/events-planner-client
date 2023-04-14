import React, { useEffect, useState } from "react";
import { Chart } from "primereact/chart";
import { getCurrentMonth } from "../../utils/date";
import { pieChartColors, pieChartColorsHover } from "../../utils/colors";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { getJsonValue } from "../../utils/localStorage";
import { CurrencyISO } from "../../utils/constants";

const ExpensesBlock = () => {
  const [chartData, setChartData] = useState({});
  const chartValues = [
    { item: "Аренда", value: 28 },
    { item: "Коммунальные услуги", value: 10 },
    { item: "Прочее", value: 2 },
  ];
  const [currencySymbol, setCurrencySymbol] = useState("Br");
  const [expensesCurrency, setExpensesCurrency] = useState(0);
  const currency = useSelector((state: RootState) => state.currency.value);
  const rates = getJsonValue("rates");
  const expensesByn = chartValues.reduce((acc, curr) => acc + curr.value, 0);

  useEffect(() => {
    const documentStyle = getComputedStyle(document.documentElement);
    const multiplier = rates && rates[currency];
    const data = {
      datasets: [
        {
          data: chartValues.map((val) =>
            currency === CurrencyISO.BYN
              ? val.value
              : val.value * +(multiplier || 1)
          ),
          backgroundColor: chartValues
            .map((val) => val.item)
            .map((val) =>
              documentStyle.getPropertyValue(
                pieChartColors[
                  chartValues
                    .map((val) => val.item)
                    .indexOf(val) as keyof typeof pieChartColors
                ]
              )
            ),
          hoverBackgroundColor: chartValues
            .map((val) => val.item)
            .map((val) =>
              documentStyle.getPropertyValue(
                pieChartColorsHover[
                  chartValues
                    .map((val) => val.item)
                    .indexOf(val) as keyof typeof pieChartColorsHover
                ]
              )
            ),
        },
      ],
    };
    setChartData(data);

    if (multiplier && currency !== CurrencyISO.BYN) {
      setExpensesCurrency(Math.round(expensesByn * +multiplier));
    }

    switch (currency) {
      case CurrencyISO.USD:
        setCurrencySymbol("$");
        return;
      case CurrencyISO.EUR:
        setCurrencySymbol("€");
        return;
      case CurrencyISO.BYN:
        setCurrencySymbol("Br");
        return;
      default:
        setCurrencySymbol("$");
        return;
    }
  }, [currency]);

  return (
    <div className="block expenses">
      <h2 className="mb-3">Расходы за {getCurrentMonth().toLowerCase()}</h2>
      <div className="need-flex">
        <Chart
          type="doughnut"
          data={chartData}
          plugins={[
            {
              beforeDraw(chart: any) {
                const { width } = chart;
                const { height } = chart;
                const { ctx } = chart;
                ctx.restore();
                const fontSize = (height / 160).toFixed(2);
                ctx.font = `${fontSize}em sans-serif`;
                ctx.textBaseline = "top";
                ctx.fillStyle = "#fff";
                const text =
                  currency === CurrencyISO.BYN
                    ? expensesByn + currencySymbol
                    : currencySymbol + expensesCurrency;
                const textX = Math.round(
                  (width - ctx.measureText(text).width) / 2
                );
                const textY = height / 2.1;
                ctx.fillText(text, textX, textY);
                ctx.save();
              },
            },
          ]}
        />
        <div>
          {chartValues.map((val) => (
            <div className="menu-item" key={val.item}>
              <i
                className="pi pi-circle"
                style={{
                  color: `var(${
                    pieChartColors[
                      chartValues
                        .map((val) => val.item)
                        .indexOf(val.item) as keyof typeof pieChartColors
                    ]
                  })`,
                }}
              ></i>
              <h3 className="ml-2">{val.item}</h3>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ExpensesBlock;
