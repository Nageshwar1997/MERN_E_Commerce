import { Button, Grid, TextField, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

const RegisterForm = () => {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = new FormData(e.currentTarget);

    const userData = {
      firstName: data.get("firstName"),
      lastName: data.get("lastName"),
      email: data.get("email"),
      mobileNumber: data.get("mobileNumber"),
      password: data.get("password"),
      confirmPassword: data.get("confirmPassword"),
    };

    console.log("userData", userData);
  };

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
          <Grid item xs={12}>
            <TextField
              required
              id="mobileNumber"
              name="mobileNumber"
              label="Mobile Number (eg: 9876543210)"
              fullWidth
              autoComplete="given-mobileNumber"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
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
      <div className="flex justify-center flex-col items-center">
        <div className="flex items-center py-2">
          <p>Already have an account?</p>
          <Button onClick={() => navigate("/login")} size="small" sx={{pt: 1}}>
            Login
          </Button>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
