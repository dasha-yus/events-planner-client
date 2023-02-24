import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { Toast } from "primereact/toast";
import ExpensesBlock from "../../components/statistics/expenses";
import IncomeBlock from "../../components/statistics/income";
import IncomePerPeriod from "../../components/statistics/incomePerPeriod";
import { setJsonValue } from "../../utils/localStorage";
import { ProgressSpinner } from "primereact/progressspinner";

const StatisticsPage = () => {
  const toast = useRef<any>(null);
  const errorAlert = useRef<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_API_LAYER_BASE_PATH}?base=BYN&apikey=${process.env.REACT_APP_API_LAYER_KEY}&symbols=EUR,USD`
      )
      .then((response) => {
        setJsonValue("rates", response.data.rates);
        setLoading(false);
      })
      .catch((err) => {
        toast.current.show({
          severity: "error",
          summary: "Error",
          detail: err.message || "Something went wrong",
          life: 3000,
        });
        setLoading(false);
      });
  }, []);

  return (
    <>
      {loading ? (
        <ProgressSpinner className="spinner" />
      ) : (
        <>
          <div className="statistics">
            <div className="statistics_left-side">
              <IncomeBlock />
              <ExpensesBlock />
            </div>
            <IncomePerPeriod />
          </div>
          <Toast ref={errorAlert} />
        </>
      )}
    </>
  );
};

export default StatisticsPage;
