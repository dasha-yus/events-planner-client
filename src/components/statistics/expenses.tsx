import React, { useEffect, useState } from "react";
import { Chart } from "primereact/chart";

const ExpensesBlock = () => {
  const [chartData, setChartData] = useState({});

  useEffect(() => {
    const documentStyle = getComputedStyle(document.documentElement);
    const data = {
      datasets: [
        {
          data: [28, 10, 2],
          backgroundColor: [
            documentStyle.getPropertyValue("--blue-500"),
            documentStyle.getPropertyValue("--yellow-500"),
            documentStyle.getPropertyValue("--green-500"),
          ],
          hoverBackgroundColor: [
            documentStyle.getPropertyValue("--blue-400"),
            documentStyle.getPropertyValue("--yellow-400"),
            documentStyle.getPropertyValue("--green-400"),
          ],
        },
      ],
    };

    setChartData(data);
  }, []);

  return (
    <div className="block expenses">
      <h2 className="mb-3">Расходы за март</h2>
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
          <div className="menu-item">
            <i
              className="pi pi-circle"
              style={{ color: "var(--blue-500)" }}
            ></i>
            <h3 className="ml-2">Аренда</h3>
          </div>
          <div className="menu-item">
            <i
              className="pi pi-circle"
              style={{ color: "var(--yellow-500)" }}
            ></i>
            <h3 className="ml-2">Коммунальные услуги</h3>
          </div>
          <div className="menu-item">
            <i
              className="pi pi-circle"
              style={{ color: "var(--green-500)" }}
            ></i>
            <h3 className="ml-2">Прочее</h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExpensesBlock;
