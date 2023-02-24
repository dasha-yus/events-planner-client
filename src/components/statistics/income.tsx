import React, { useEffect, useState } from "react";
import { ProgressBar } from "primereact/progressbar";
import { getCurrentMonth } from "../../utils/date";
import { getJsonValue, getPlainValue } from "../../utils/localStorage";
import { CurrencyISO } from "../../utils/constants";

const IncomeBlock = () => {
  const [earnedByn, setEarnedByn] = useState(1450);
  const [spentByn, setSpentByn] = useState(360);
  const [earnedCurrency, setEarnedCurrency] = useState(0);
  const [spentCurrency, setSpentCurrency] = useState(0);
  const [income, setIncome] = useState(0);
  const [currencySymbol, setCurrencySymbol] = useState("Br");

  const val1 = (earnedByn * 100) / (earnedByn + spentByn);
  const val2 = (spentByn * 100) / (earnedByn + spentByn);
  const currency = getPlainValue("currency");
  const rates = getJsonValue("rates");

  useEffect(() => {
    if (currency && rates && currency !== CurrencyISO.BYN) {
      const multiplier = rates[currency];
      setEarnedCurrency(Math.round(earnedByn * +multiplier));
      setSpentCurrency(Math.round(spentByn * +multiplier));
      setIncome(earnedCurrency - spentCurrency);
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
  }, [currency, earnedByn, earnedCurrency, spentCurrency, rates, spentByn]);

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
          </h2>
          <h4>прибыль{currency === CurrencyISO.BYN && <span>{currencySymbol}</span>}</h4>
        </div>
      </div>
    </div>
  );
};

export default IncomeBlock;
