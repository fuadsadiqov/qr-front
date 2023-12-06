import React, { useState } from "react";
import { FaLock } from "react-icons/fa";
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

const Login: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(username);
    console.log(password);
  };

  return (
    <div className="h-screen flex">
      <div className="hidden md:flex" style={{ flex: 1.5 }}>
        <img src="/dgka-bg.jpg" alt="" className="h-full w-full object-cover" />
      </div>

      <div className="flex-1 flex items-center justify-center flex-col gap-10 pb-28">
        <div className="flex items-center justify-center flex-col">
          <div className="bg-[#9C27B0] text-white w-14 h-14 rounded-full flex items-center justify-center">
            <FaLock className="text-2xl" />
          </div>
          <h2 className="text-2xl">Sign in</h2>
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
              value={username}
              onChange={(e) => setUsername(e.target.value)}
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
              onChange={(e) => setPassword(e.target.value)}
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
  );
};

export default Login;
