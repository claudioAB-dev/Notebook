import React from "react";
import { useAuth } from "../context/AuthContext";

const UserProfile = () => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return <div>Cargando información del usuario...</div>;
  }

  if (!user) {
    return <div>No has iniciado sesión.</div>;
  }

  const userId = user.id;

  return (
    <div>
      <h1>Perfil de Usuario</h1>
      <p>¡Hola, {user.username}!</p>
      <p>
        Tu ID de usuario es: <strong>{userId}</strong>
      </p>
      <p>Tu email es: {user.email}</p>
    </div>
  );
};

export default UserProfile;
