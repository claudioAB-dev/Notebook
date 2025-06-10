import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  useMemo,
} from "react";
import type { ReactNode } from "react";

interface AuthUser {
  id: number;
  username: string;
  email: string;
}

interface AuthContextType {
  token: string | null;
  user: AuthUser | null;
  isAuthenticated: boolean;
  login: (newToken: string, userData: AuthUser) => void;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  useEffect(() => {
    try {
      const storedToken = localStorage.getItem("authToken");
      const storedUserString = localStorage.getItem("authUser");
      if (storedToken && storedUserString) {
        const storedUser = JSON.parse(storedUserString) as AuthUser;
        if (storedUser && typeof storedUser.id === "number") {
          setToken(storedToken);
          setUser(storedUser);
        } else {
          console.warn("Stored user data is invalid. Clearing auth storage.");
          localStorage.removeItem("authToken");
          localStorage.removeItem("authUser");
        }
      }
    } catch (error) {
      // Si hay un error al parsear (ej. JSON malformado), limpiar localStorage
      console.error("Error parsing stored auth data:", error);
      localStorage.removeItem("authToken");
      localStorage.removeItem("authUser");
    } finally {
      setIsLoading(false); // Finaliza la carga independientemente del resultado
    }
  }, []);

  const login = (newToken: string, userData: AuthUser) => {
    localStorage.setItem("authToken", newToken);
    localStorage.setItem("authUser", JSON.stringify(userData));
    setToken(newToken);
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("authUser");
    setToken(null);
    setUser(null);
  };

  const isAuthenticated = useMemo(() => !!token, [token]);

  const contextValue = useMemo(
    () => ({
      token,
      user,
      isAuthenticated,
      login,
      logout,
      isLoading,
    }),
    [token, user, isAuthenticated, isLoading]
  );

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
