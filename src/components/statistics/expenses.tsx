import React, { useEffect, useState } from "react";
import { Chart } from "primereact/chart";
import { getCurrentMonth } from "../../utils/date";
import { pieChartColors, pieChartColorsHover } from "../../utils/colors";

const ExpensesBlock = () => {
  const [chartData, setChartData] = useState({});
  const [chartValues, setChartValues] = useState([
    { item: "Аренда", value: 28 },
    { item: "Коммунальные услуги", value: 10 },
    { item: "Прочее", value: 2 },
  ]);

  useEffect(() => {
    const documentStyle = getComputedStyle(document.documentElement);
    const data = {
      datasets: [
        {
          data: chartValues.map((val) => val.value),
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
  }, []);

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
                const text = "$40";
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
