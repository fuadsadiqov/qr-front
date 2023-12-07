import React, { useState } from "react";
import {
  TextField,
  IconButton,
  InputAdornment,
  OutlinedInput,
  InputLabel,
  FormControl,
  Button,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { ApiMethods, SnackbarStatus } from "../interfaces/method";
import CustomizedSnackbars from "../components/Snackbar";
import { environment } from "../environment/environment.prod";
import { AUTH_URL } from "../constants/url";
import { fetchApi } from "../utils/fetch";
import { useNavigate } from 'react-router-dom';

interface LoginProps {
  setisAuth: React.Dispatch<React.SetStateAction<boolean | null>>;
}

const Login: React.FC<LoginProps> = ({setisAuth}) => {
  const [form, setForm] = useState({
    login: "",
    password: ""
  });
  const [showPassword, setShowPassword] = useState(false);
  const [snackbar, setSnackbar] = useState<any>(false);
  const navigate = useNavigate();
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetch(environment.apiUrl + AUTH_URL.POST, fetchApi(ApiMethods.POST, form))
      .then(res => res.json())
      .then(data => {
        if(data.token){
          sessionStorage.setItem('token', data.token)
          setisAuth(true)
          navigate('/admin')
        }        
        else if (data.error) {
          setSnackbar({
            opened: true,
            status: SnackbarStatus.UNSUCCESSFULL,
            message: "Incorrect username or password",
          })
        }
      })
      .catch(error => {
        console.error(error)
      })
  };

  return (
    <>
      <div className="h-screen flex">
        <div className="hidden md:flex" style={{ flex: 1.5 }}>
          <img src="/dgka-bg.jpg" alt="" className="h-full w-full object-cover" />
        </div>

        <div className="flex-1 flex items-center justify-center flex-col gap-10 pb-28">
          <div className="flex items-center justify-center flex-col">
            <div className="w-[140px] rounded-full flex items-center justify-center">
              <img src="/ascca-login.png" alt="" />
            </div>
          </div>

          <form
            onSubmit={handleFormSubmit}
            className="flex items-center justify-center gap-5 flex-col w-[80%] max-w-md"
          >
            <FormControl variant="outlined" fullWidth>
              <TextField
                required
                label="Username"
                variant="outlined"
                value={form.login}
                onChange={(e) => setForm({ ...form, login: e.target.value })}
              />
            </FormControl>

            <FormControl variant="outlined" fullWidth>
              <InputLabel htmlFor="outlined-adornment-password">
                Password
              </InputLabel>
              <OutlinedInput
                required
                id="outlined-adornment-password"
                type={showPassword ? "text" : "password"}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Password"
              />
            </FormControl>

            <Button variant="contained" type="submit" fullWidth>
              Submit
            </Button>
          </form>
        </div>
      </div>
      {snackbar && <CustomizedSnackbars open={snackbar} setOpen={setSnackbar} />}
    </>
  );
};

export default Login;
