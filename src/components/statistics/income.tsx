import React, { useEffect, useState } from "react";
import { ProgressBar } from "primereact/progressbar";
import { getCurrentMonth } from "../../utils/date";
import { CurrencyISO } from "../../utils/constants";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { getJsonValue } from "../../utils/localStorage";

const IncomeBlock = () => {
  const earnedByn = 380;
  const spentByn = 40;
  const [earnedCurrency, setEarnedCurrency] = useState(0);
  const [spentCurrency, setSpentCurrency] = useState(0);
  const [income, setIncome] = useState(0);
  const [currencySymbol, setCurrencySymbol] = useState("Br");

  const val1 = (earnedByn * 100) / (earnedByn + spentByn);
  const val2 = (spentByn * 100) / (earnedByn + spentByn);
  const currency = useSelector((state: RootState) => state.currency.value);
  const rates = getJsonValue("rates");

  useEffect(() => {
    if (currency && rates) {
      if (currency !== CurrencyISO.BYN) {
        const multiplier = rates[currency];
        setEarnedCurrency(Math.round(earnedByn * +multiplier));
        setSpentCurrency(Math.round(spentByn * +multiplier));
      } else {
        setEarnedCurrency(earnedByn);
        setSpentCurrency(spentByn);
      }
    }
    setIncome(earnedCurrency - spentCurrency);
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
  }, [currency, earnedByn, earnedCurrency, spentCurrency, spentByn, rates]);

  const displayValueTemplateX = (value: number) => {
    return (
      <React.Fragment>
        {earnedCurrency}
        {currencySymbol}
      </React.Fragment>
    );
  };

  const displayValueTemplateY = (value: number) => {
    return (
      <React.Fragment>
        {spentCurrency}
        {currencySymbol}
      </React.Fragment>
    );
  };

  return (
    <div className="block income">
      <h2 className="mb-3">Доход за {getCurrentMonth().toLowerCase()}</h2>
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
          <h2>
            {currency !== CurrencyISO.BYN && <span>{currencySymbol}</span>}
            {income}
            {currency === CurrencyISO.BYN && <span>{currencySymbol}</span>}
          </h2>
          <h4>прибыль</h4>
        </div>
      </div>
    </div>
  );
};

export default IncomeBlock;
