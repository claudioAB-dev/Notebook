import React from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  Outlet,
} from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { ThemeProvider } from "./context/ThemeContext";
import Navbar from "./components/Navbar";
import LoginPage from "./components/LoginPage";

const PrivateLayout = () => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="app-layout">
      <Navbar />
      <main>
        <Outlet />
      </main>
    </div>
  );
};

const HomePage = () => {
  const { user, logout } = useAuth();
  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>¡Bienvenido, {user?.username}!</h1>
      <p>Has iniciado sesión correctamente en tu Notebook.</p>
      <button onClick={logout} className="btn btn-secondary">
        Cerrar Sesión
      </button>
    </div>
  );
};

const App = () => {
  return (
    <AuthProvider>
      <ThemeProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<LoginPage />} />

            <Route element={<PrivateLayout />}>
              <Route path="/" element={<HomePage />} />
            </Route>

            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </AuthProvider>
  );
};

export default App;
