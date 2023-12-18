import Dashboard from "../components/Dashboard";

import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { environment } from "../environment/environment.prod";
import { fetchApi } from "../utils/fetch";
import { AUTH_URL } from "../constants/url";
import { ApiMethods } from "../interfaces/method";
import { CircularProgress } from "@mui/material";

function Admin() {
  const [isAuth, setIsAuth] = useState<boolean | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const checkToken = async () => {
      const token = sessionStorage.getItem("token");
      if (token) {
        try {
          const response = await fetch(
            environment.apiUrl + AUTH_URL.HAS_TOKEN,
            fetchApi(ApiMethods.POST, { token })
          );
          const data = await response.json();
          if (data.message === "OK") {
            setIsAuth(true);
          } else {
            setIsAuth(false);
            navigate("/login");
          }
        } catch (error) {
          console.error(error);
        }
      } else {
        navigate("/login");
      }
    };
    checkToken();
  }, [isAuth]);

  return (
    <>
      {isAuth ? (
        <Dashboard />
      ) : (
        <div className="flex justify-center pt-[100px]">
          <CircularProgress color="info" />
        </div>
      )}
    </>
  );
}
export default Admin;
