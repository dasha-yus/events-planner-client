import React from "react";
import AuthImage from "../../assets/images/auth.jpeg";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";

const AuthPage = () => {
  return (
    <div className="auth-container">
      <div className="auth-container_img">
        <img alt="auth" src={AuthImage} />
      </div>
      <div className="auth-container_form">
        <form className="form">
          <div className="mb-6 form-group">
            <h1>Вход</h1>
          </div>
          <div className="mb-4 form-group">
            <span className="p-input-icon-left">
              <i className="pi pi-user" />
              <InputText
                placeholder="Адрес эл. почты"
                className="form-group_input"
              />
            </span>
          </div>
          <div className="mb-3 form-group">
            <span className="p-input-icon-left">
              <i className="pi pi-lock" />
              <InputText
                placeholder="Пароль"
                className="form-group_input"
                type="password"
              />
            </span>
          </div>
          <div className="mt-4 form-group">
            <Button label="Войти" className="form-group_btn" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default AuthPage;
