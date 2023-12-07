import Admin from "./Admin";
import Home from "./Home";
import Login from "./Login";
import { Route, Routes, useNavigate } from "react-router-dom";
import { useEffect, useState } from 'react'
import { environment } from "../environment/environment.prod";
import { fetchApi } from "../utils/fetch";
import { AUTH_URL } from "../constants/url";
import { ApiMethods } from "../interfaces/method";
import { Navigate } from "react-router-dom";

function Pages() {
  const [isAuth, setIsAuth] = useState<boolean | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const checkToken = async () => {
      const token = sessionStorage.getItem('token');
      if (token) {
        try {
          const response = await fetch(environment.apiUrl + AUTH_URL.HAS_TOKEN, fetchApi(ApiMethods.POST, { token }));
          const data = await response.json();
          if (data.message === 'OK') {
            setIsAuth(true);
          } else {
            navigate('/login')
          }
        } catch (error) {
          console.error(error);
        }
      }
    };
    checkToken();
  }, []);

  return (
    <Routes>
      <Route path="/*" element={<Home />} />
      <Route path="/admin/*" element={<Admin />} />
      <Route path="/login" element={<Login setisAuth={setIsAuth} />} />
    </Routes>
  );
}

export default Pages;