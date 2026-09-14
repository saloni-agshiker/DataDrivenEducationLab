import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

const AUTH_STORAGE_KEY = "discussion-dashboard-authenticated";
const MOCK_USERNAME = "sagshiker3";
const MOCK_PASSWORD = "cll4699";

interface AuthContextValue {
  isAuthenticated: boolean;
  isReady: boolean;
  login: (username: string, password: string) => boolean;
  loginWithSSO: () => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

function saveAuthState(isAuthenticated: boolean) {
  try {
    if (isAuthenticated) {
      window.sessionStorage.setItem(AUTH_STORAGE_KEY, "true");
    } else {
      window.sessionStorage.removeItem(AUTH_STORAGE_KEY);
    }
  } catch {
    // The demo still works if browser storage is unavailable.
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    try {
      setIsAuthenticated(window.sessionStorage.getItem(AUTH_STORAGE_KEY) === "true");
    } catch {
      setIsAuthenticated(false);
    }
    setIsReady(true);
  }, []);

  const login = (username: string, password: string) => {
    const valid = username.trim() === MOCK_USERNAME && password === MOCK_PASSWORD;
    if (valid) {
      setIsAuthenticated(true);
      saveAuthState(true);
    }
    return valid;
  };

  const loginWithSSO = () => {
    // Frontend-only placeholder until a real Georgia Tech OAuth/OIDC flow exists.
    setIsAuthenticated(true);
    saveAuthState(true);
  };

  const logout = () => {
    setIsAuthenticated(false);
    saveAuthState(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, isReady, login, loginWithSSO, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
