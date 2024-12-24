/* eslint-disable react-hooks/exhaustive-deps */
import { Button, Grid, TextField } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getUser, login } from "../../state/auth/action";

const LoginForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const auth = useSelector((store) => store.auth);

  const jwt = localStorage.getItem("jwt");

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = new FormData(e.currentTarget);

    const userData = {
      email: data.get("email"),
      password: data.get("password"),
    };

    dispatch(login(userData));

    console.log("userData", userData);
  };

  useEffect(() => {
    if (jwt) {
      dispatch(getUser(jwt));
    }
  }, [jwt, auth?.jwt]);

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              required
              type="email"
              id="email"
              name="email"
              label="Email"
              fullWidth
              autoComplete="given-email"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              type="password"
              id="password"
              name="password"
              label="Password"
              fullWidth
              autoComplete="given-password"
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              type="submit"
              className="w-full"
              variant="contained"
              size="large"
              sx={{ padding: "0.8rem 0", bgcolor: "#9155FD", color: "white" }}
            >
              Login
            </Button>
          </Grid>
        </Grid>
      </form>
      <div className="flex justify-center flex-col items-center">
        <div className="flex items-center py-2">
          <p>Don't have an account?</p>
          <Button
            onClick={() => navigate("/register")}
            size="small"
            sx={{ pt: 1 }}
          >
            Register
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
