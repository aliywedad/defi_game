import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { LoginPage } from "./LoginPage";
import { RegisterPage } from "./RegisterPage";
import { WelcomePage } from "./WelcomePage";

interface User {
  fullName: string;
  email: string;
  password: string;
}

export default function App() {
  const [users, setUsers] = useState<User[]>([]); // Liste des utilisateurs inscrits
  const [isAuthenticated, setIsAuthenticated] = useState(false); // État pour savoir si l'utilisateur est connecté

  return (
    <Router>
      <Routes>
        <Route
          path="/login"
          element={
            !isAuthenticated ? (
              <LoginPage users={users} setIsAuthenticated={setIsAuthenticated} />
            ) : (
              <Navigate to="/welcome" />
            )
          }
        />
        <Route
          path="/register"
          element={<RegisterPage users={users} setUsers={setUsers} />}
        />
        <Route
          path="/welcome"
          element={isAuthenticated ? <WelcomePage /> : <Navigate to="/login" />}
        />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}
