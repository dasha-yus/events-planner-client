import React, { useRef, useState } from "react";
import "/node_modules/flag-icons/css/flag-icons.min.css";
import { Link, NavLink } from "react-router-dom";
import { Avatar } from "primereact/avatar";
import { Badge } from "primereact/badge";
import { Menu } from "primereact/menu";
import { Toast } from "primereact/toast";
import Logo from "../../assets/images/logo-light.png";
import { classNames } from "primereact/utils";
import { CurrencyISO } from "../../utils/constants";
import { useDispatch } from "react-redux";
import { switchCurrency } from "../../store/slices/currencyReducer";

const Header = () => {
  const menu = useRef<any>(null);
  const currency = useRef<any>(null);
  const toast = useRef<any>(null);
  const dispatch = useDispatch()

  const [currentCurrency, setCurrentCurrency] = useState("USD");

  const profileItems = [
    {
      label: "Профиль",
      items: [
        {
          label: "Настройки",
          icon: "pi pi-cog",
        },
        {
          label: "Выход",
          icon: "pi pi-sign-out",
          url: "/login",
        },
      ],
    },
  ];

  const selectCurrency = (iso: CurrencyISO) => {
    setCurrentCurrency(iso);
    dispatch(switchCurrency(iso))
    currency.current.toggle(true);
  };

  const currencyItems = [
    {
      label: "Валюта",
      items: [
        {
          template: () => (
            <div
              className={classNames("currency_menu-item", {
                currency_selected: currentCurrency === CurrencyISO.USD,
              })}
              onClick={() => selectCurrency(CurrencyISO.USD)}
            >
              <div>Доллар США</div>
              <div>
                <span className="fi fi-us mr-2" />
                {CurrencyISO.USD}
              </div>
            </div>
          ),
        },
        {
          template: () => (
            <div
              className={classNames("currency_menu-item", {
                currency_selected: currentCurrency === CurrencyISO.EUR,
              })}
              onClick={() => selectCurrency(CurrencyISO.EUR)}
            >
              <div>Евро</div>
              <div>
                <span className="fi fi-eu mr-2" />
                {CurrencyISO.EUR}
              </div>
            </div>
          ),
        },
        {
          template: () => (
            <div
              className={classNames("currency_menu-item", {
                currency_selected: currentCurrency === CurrencyISO.BYN,
              })}
              onClick={() => selectCurrency(CurrencyISO.BYN)}
            >
              <div>Белорусский рубль</div>
              <div>
                <span className="fi fi-by mr-2" />
                {CurrencyISO.BYN}
              </div>
            </div>
          ),
        },
      ],
    },
  ];

  return (
    <div className="navbar">
      <div className="navbar_left">
        <Link to={"/home"} className="mr-3">
          <img alt="logo" src={Logo} width={50} height={50} />
        </Link>
        <NavLink
          className={({ isActive }) =>
            isActive ? "link nav-link_active" : "link nav-link"
          }
          to="/home"
        >
          Календарь
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            isActive ? "link nav-link_active" : "link nav-link"
          }
          to="/stats"
        >
          Статистика
        </NavLink>
      </div>
      <div className="navbar_right">
        <div
          className="mr-4 currency"
          onClick={(e) => currency.current.toggle(e)}
        >
          {currentCurrency}
          <i className="pi pi-angle-down ml-1" />
        </div>
        <Toast ref={toast}></Toast>
        <Menu model={currencyItems} popup ref={currency} className="mt-2" />
        <i
          className="pi pi-bell mr-4 p-text-secondary p-overlay-badge"
          style={{ fontSize: "1.5rem", color: "#ffffff" }}
        >
          <Badge value="2"></Badge>
        </i>
        <Avatar
          label="TY"
          style={{ backgroundColor: "#6366f1", color: "#ffffff" }}
          shape="circle"
          onClick={(e) => menu.current.toggle(e)}
        />
        <Toast ref={toast}></Toast>
        <Menu model={profileItems} popup ref={menu} className="mt-2" />
      </div>
    </div>
  );
};

export default Header;
