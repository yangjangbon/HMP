import "./assets/css/App.css";
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import HMP from "./pages/HMP";
import HMPRESULT from "./pages/HMPResult";
import Exercise from "./pages/Exercise";
import ExerciseResult from "./pages/ExerciseResult";

const App = () => {
  return (
    <div className="App">
      <header className="App-header">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />}>
              {" "}
            </Route>
            <Route path="/hmp" element={<HMP />}>
              {" "}
            </Route>
            <Route path="/hmp/result" element={<HMPRESULT />}>
              {" "}
            </Route>
            <Route path="/exercise" element={<Exercise />}>
              {" "}
            </Route>
            <Route path="/exercise/result" element={<ExerciseResult />}>
              {" "}
            </Route>
          </Routes>
        </BrowserRouter>
      </header>
    </div>
  );
};
export default App;
