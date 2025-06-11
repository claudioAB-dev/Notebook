import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/Login.css";

const RegisterPage: React.FC = () => {
  const [nombre_usuario, setUsername] = useState("");
  const [email, setEmail] = useState(""); // De 'correo_electronico' a 'email'
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!nombre_usuario || !email || !password) {
      setError("Todos los campos son obligatorios");
      return;
    }

    try {
      const response = await fetch("http://127.0.0.1:5000/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ nombre_usuario, email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.msg || "Error al registrar el usuario");
      }

      console.log("Registro exitoso:", data);
      navigate("/login");
    } catch (err: any) {
      setError(err.message);
      console.error("Error en el registro:", err);
    }
  };

  return (
    <div className="login-container">
      {" "}
      {/* Reutilizamos el contenedor principal */}
      <div className="login-card">
        {" "}
        {/* Reutilizamos la tarjeta */}
        <h2>Create an account</h2>
        <form onSubmit={handleSubmit} noValidate>
          <div className="form-group">
            <label htmlFor="username">User name</label>
            <input
              id="username"
              type="text"
              className="form-input"
              value={nombre_usuario}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              className="form-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">password</label>
            <input
              id="password"
              type="password"
              className="form-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {error && <p className="error-message">{error}</p>}

          <button type="submit" className="btn btn-primary">
            Registrarse
          </button>
        </form>
        <p className="auth-switch-link">
          Already have an account? <Link to="/login">Login</Link>{" "}
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
