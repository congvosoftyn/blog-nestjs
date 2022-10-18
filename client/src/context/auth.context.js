import { createContext, useEffect, useState } from "react";
import { AxiosInstance } from "../utils/axios.instance";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );

  const login = async (inputs, navigate, setError) => {
    try {
      const { data } = await AxiosInstance({
        method: "POST",
        url: "/users/login",
        headers: {
          "Content-Type": "application/json",
        },
        data: JSON.stringify(inputs),
      });
      setCurrentUser(data.user);
      localStorage.setItem('refreshToken', data.token.refreshToken)
      navigate("/")
    } catch (error) {
      setError(error.response.data.message)
      // console.error("error in AuthContextProvider", error);
      navigate("/login")
    }
  };

  const logout = async () => {
    try {
      await AxiosInstance({
        method: "POST",
        url: "/users/logout",
        headers: {
          "Content-Type": "application/json"
        },
        data: JSON.stringify({ refreshToken: localStorage.getItem('refreshToken') }),
      });
      setCurrentUser(null);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(currentUser));
  }, [currentUser]);

  return (
    <AuthContext.Provider value={{ currentUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
