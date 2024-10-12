import './App.css';
import "bootstrap-css-only";
import DashboardPage from '../pages/Dashboard';
import RegistroPage from '../pages/Registro';
import LoginPage from '../pages/Login';
import { useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import PrivateRoute from "../pages/PrivateRoute/PrivateRoute";


function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<RegistroPage />} />

        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <DashboardPage />
            </PrivateRoute>
          }
        />

      </Routes>
    </>
  );
  // <Route
  //         path="/dashboard"
  //         element={
  //           <PrivateRoute>
  //             <DashboardPage />
  //           </PrivateRoute>
  //         }
  //       />
  //     </Routes>
}

export default App;
