import { useState, useEffect, useCallback } from "react";

const storageName = "userData";

export default () => {
  const [token, setToken] = useState(null);
  const [userId, setUserId] = useState(null);
  const [divineAccess, setDivineAccess] = useState(null);

  const login = useCallback((jwtToken, id, access) => {
    setToken(jwtToken);
    setUserId(id);
    setDivineAccess(access);

    localStorage.setItem(
      storageName,
      JSON.stringify({ token: jwtToken, userId: id, divineAccess: access })
    );
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    setUserId(null);
    setDivineAccess(null);

    localStorage.removeItem(storageName);
  }, []);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem(storageName));

    if (data?.token) {
      login(data.token, data.userId, data.divineAccess);
    }
  }, [login]);

  return { login, logout, token, userId, divineAccess };
};
