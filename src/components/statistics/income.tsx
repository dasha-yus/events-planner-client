import React from "react";
import { ProgressBar } from "primereact/progressbar";

const IncomeBlock = () => {
  const x = 120;
  const y = 40;

  const val1 = (x * 100) / (x + y);
  const val2 = (y * 100) / (x + y);

  const displayValueTemplateX = (value: number) => {
    return <React.Fragment>{x}$</React.Fragment>;
  };

  const displayValueTemplateY = (value: number) => {
    return <React.Fragment>{y}$</React.Fragment>;
  };

  return (
    <div className="block income">
      <h2 className="mb-3">Доход за март</h2>
      <div className="need-flex">
        <div style={{ width: "70%" }}>
          <div className="mb-3">
            <h4 className="mb-2">Заработано</h4>
            <ProgressBar
              value={val1}
              style={{ width: "100%", height: "30px" }}
              color="var(--green-600)"
              displayValueTemplate={displayValueTemplateX}
            ></ProgressBar>
          </div>
          <div className="mb-3">
            <h4 className="mb-2">Потрачено</h4>
            <ProgressBar
              value={val2}
              style={{ width: "100%", height: "30px" }}
              color="var(--red-500)"
              displayValueTemplate={displayValueTemplateY}
            ></ProgressBar>
          </div>
        </div>
        <div className="income_value">
          <h2>${x - y}</h2>
          <h4>прибыль</h4>
        </div>
      </div>
    </div>
  );
};

export default IncomeBlock;
