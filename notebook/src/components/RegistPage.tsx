import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const RegisterPage: React.FC = () => {
  // 1. Cambiamos el nombre del estado para mayor claridad
  const [nombre_usuario, setUsername] = useState("");
  const [email, setEmail] = useState(""); // De 'correo_electronico' a 'email'
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // 2. Usamos la nueva variable de estado en la validación
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
        // 3. Enviamos el JSON con la clave 'email' y el valor correcto
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
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <div
        style={{
          padding: "2rem",
          border: "1px solid #ccc",
          borderRadius: "8px",
          width: "300px",
        }}
      >
        <h2>Registro</h2>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: "1rem" }}>
            <label htmlFor="username">Nombre de Usuario</label>
            <input
              type="text"
              id="username"
              value={nombre_usuario}
              onChange={(e) => setUsername(e.target.value)}
              style={{ width: "100%", padding: "0.5rem" }}
            />
          </div>
          <div style={{ marginBottom: "1rem" }}>
            <label htmlFor="email">Correo Electrónico</label>
            <input
              type="email"
              id="email"
              // 4. Conectamos el input a la nueva variable de estado
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{ width: "100%", padding: "0.5rem" }}
            />
          </div>
          <div style={{ marginBottom: "1rem" }}>
            <label htmlFor="password">Contraseña</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{ width: "100%", padding: "0.5rem" }}
            />
          </div>
          {error && <p style={{ color: "red" }}>{error}</p>}
          <button
            type="submit"
            style={{ width: "100%", padding: "0.75rem", cursor: "pointer" }}
          >
            Registrarse
          </button>
        </form>
        <p style={{ marginTop: "1rem", textAlign: "center" }}>
          ¿Ya tienes una cuenta? <Link to="/login">Inicia Sesión</Link>{" "}
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
