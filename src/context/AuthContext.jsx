import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext(null);
const STORAGE_KEY = "leadscout_auth";

export function AuthProvider({ children }) {
  const [auth, setAuth] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY)) || null;
    } catch {
      return null;
    }
  });

  useEffect(() => {
    if (auth) localStorage.setItem(STORAGE_KEY, JSON.stringify(auth));
    else localStorage.removeItem(STORAGE_KEY);
  }, [auth]);

  // login response from backend: { Jwt, userid, roles }
  const login = ({ Jwt, userid, roles }, username) =>
    setAuth({ token: Jwt, userid, roles, username });

  const logout = () => setAuth(null);

  return (
    <AuthContext.Provider
      value={{
        auth,
        token: auth?.token || null,
        username: auth?.username || null,
        isAuthed: !!auth?.token,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
