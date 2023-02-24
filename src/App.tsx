import React from "react";
import "./App.scss";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import AuthPage from "./pages/Auth";
import NotFound from "./pages/NotFound";
import Header from "./components/layout/Header";
import CalendarPage from "./pages/Calendar";
import StatisticsPage from "./pages/Statistics";
import Footer from "./components/layout/Footer";

function App() {
  const location = useLocation();
  const isLoginPage = location.pathname === "/login";

  return (
    <div className="app">
      {isLoginPage || <Header />}
      <div className={isLoginPage ? undefined : "content"}>
        <Routes>
          <Route path="/" element={<Navigate to="/home" replace />} />
          <Route path="/home" element={<CalendarPage />} />
          <Route path="/stats" element={<StatisticsPage />} />
          <Route path="/login" element={<AuthPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
      {isLoginPage || <Footer />}
    </div>
  );
}

export default App;
