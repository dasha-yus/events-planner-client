import React from "react";
import ExpensesBlock from "../../components/statistics/expenses";
import IncomeBlock from "../../components/statistics/income";
import IncomePerPeriod from "../../components/statistics/incomePerPeriod";

const StatisticsPage = () => {
  return (
    <div className="need-flex">
      <div style={{ marginRight: "40px" }}>
        <IncomeBlock />
        <ExpensesBlock />
      </div>
      <IncomePerPeriod />
    </div>
  );
};

export default StatisticsPage;
