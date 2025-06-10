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
// 1. Importa el nuevo componente de registro
import RegisterPage from "./components/RegistPage";

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
            {/* Rutas públicas */}
            <Route path="/login" element={<LoginPage />} />
            {/* 2. Añade la nueva ruta para el registro */}
            <Route path="/register" element={<RegisterPage />} />

            {/* Rutas privadas anidadas */}
            <Route element={<PrivateLayout />}>
              <Route path="/" element={<HomePage />} />
            </Route>

            {/* Redirección para cualquier otra ruta */}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </AuthProvider>
  );
};

export default App;
