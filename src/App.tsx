import React from "react";
import "./App.scss";
import { Routes, Route, Navigate } from "react-router-dom";
import AuthPage from "./pages/Auth";
import NotFound from "./pages/NotFound";
import Header from "./components/layout/Header";
import CalendarPage from "./pages/Calendar";
import StatisticsPage from "./pages/Statistics";
import Footer from "./components/layout/Footer";

function App() {
  return (
    <>
      <Header />
      <div className="app">
        <Routes>
          <Route path="/" element={<Navigate to="/home" replace />} />
          <Route path="/home" element={<CalendarPage />} />
          <Route path="/stats" element={<StatisticsPage />} />
          <Route path="/login" element={<AuthPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
      <Footer />
    </>
  );
}

export default App;
