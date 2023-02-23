import React, { useState } from "react";
import AuthImage from "../../assets/images/auth.jpg";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { classNames } from "primereact/utils";

const AuthPage = () => {
  const [isAccountRegistered, setIsAccountRegistered] = useState(true);
  const navigate = useNavigate();

  const switchIsAccountRegistered = () => {
    setIsAccountRegistered(!isAccountRegistered);
  };

  const formik: any = useFormik({
    initialValues: {
      email: "",
      password: "",
      passwordCheck: "",
    },
    validate: (data: any) => {
      let errors: any = {};

      if (!data.email) {
        errors.email = "Поле 'E-mail' обязательно для заполнения";
      } else if (
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(data.email)
      ) {
        errors.email = "Неверный формат Email";
      }

      if (!data.password) {
        errors.password = "Поле 'Пароль' обязательно для заполнения";
      }

      if (!isAccountRegistered) {
        if (!data.passwordCheck) {
          errors.passwordCheck = "Поле 'Подтвердите пароль' обязательно для заполнения";
        } else if (data.password !== data.passwordCheck) {
          errors.passwordCheck = "Пароли не совпадают";
        }
      }

      return errors;
    },
    onSubmit: (data: any) => {
      navigate("/home");
    },
  });

  const isFormFieldValid = (name: string) =>
    !!(formik.touched[name] && formik.errors[name]);

  const getFormErrorMessage = (name: string) => {
    return (
      isFormFieldValid(name) && (
        <small className="p-error mt-2 validation-error-auth">
          {formik.errors[name]}
        </small>
      )
    );
  };

  return (
    <div className="auth-container">
      <div className="auth-container_img">
        <img alt="auth" src={AuthImage} />
      </div>
      <div className="auth-container_form">
        <form onSubmit={formik.handleSubmit} className="form">
          <div className="mb-6 form-group">
            <h1>{isAccountRegistered ? "Вход" : "Регистрация"}</h1>
          </div>
          <div className="mb-4 form-group">
            <span className="p-input-icon-left">
              <i className="pi pi-user" />
              <InputText
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                placeholder="E-mail"
                className={classNames("form-group_input", {
                  "p-invalid": isFormFieldValid("email"),
                })}
              />
            </span>
            {getFormErrorMessage("email")}
          </div>
          <div className="mb-4 form-group">
            <span className="p-input-icon-left">
              <i className="pi pi-lock" />
              <InputText
                name="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                placeholder="Пароль"
                className={classNames("form-group_input", {
                  "p-invalid": isFormFieldValid("password"),
                })}
                type="password"
              />
            </span>
            {getFormErrorMessage("password")}
          </div>
          {isAccountRegistered || (
            <div className="mb-4 form-group">
              <span className="p-input-icon-left">
                <i className="pi pi-lock" />
                <InputText
                  name="passwordCheck"
                  placeholder="Подтвердите пароль"
                  value={formik.values.passwordCheck}
                  onChange={formik.handleChange}
                  className={classNames("form-group_input", {
                    "p-invalid": isFormFieldValid("password"),
                  })}
                  type="password"
                />
              </span>
              {getFormErrorMessage("passwordCheck")}
            </div>
          )}
          <div className="mt-4 form-group">
            <Button
              label={isAccountRegistered ? "Войти" : "Зарегестрироваться"}
              className="form-group_btn"
            />
          </div>
          <div className="not-registered mt-3">
            <Link
              to={"#"}
              className="form-group_btn"
              onClick={switchIsAccountRegistered}
            >
              {isAccountRegistered
                ? "Ещё не зарегестрированы?"
                : "Уже зарегестрированы?"}
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AuthPage;
