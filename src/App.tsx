import React from "react";
import "./App.scss";
import { Routes, Route } from "react-router-dom";
import AuthPage from "./pages/Auth";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/login" element={<AuthPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
