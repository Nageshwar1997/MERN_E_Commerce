/* eslint-disable react-hooks/exhaustive-deps */
import { Button, Grid, TextField } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getUser, register } from "../../state/auth/action";

const RegisterForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const jwt = localStorage.getItem("jwt");
  const auth  = useSelector((store) => store.auth);

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = new FormData(e.currentTarget);

    const userData = {
      firstName: data.get("firstName"),
      lastName: data.get("lastName"),
      email: data.get("email"),
      password: data.get("password"),
      confirmPassword: data.get("confirmPassword"),
    };

    if (userData.password !== userData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    dispatch(register(userData));

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
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="firstName"
              name="firstName"
              label="First Name"
              fullWidth
              autoComplete="given-name"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="lastName"
              name="lastName"
              label="Last Name"
              fullWidth
              autoComplete="given-name"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              id="email"
              name="email"
              label="Email"
              fullWidth
              autoComplete="given-email"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
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
          <Grid item xs={12} sm={6}>
            <TextField
              required
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              label="Confirm Password"
              fullWidth
              autoComplete="given-confirmPassword"
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
              Register
            </Button>
          </Grid>
        </Grid>
      </form>
      <div className="w-full flex justify-center items-center py-2">
        <p>Already have an account?</p>
        <Button onClick={() => navigate("/login")} size="small" sx={{ pt: 1 }}>
          Login
        </Button>
      </div>
    </div>
  );
};

export default RegisterForm;
