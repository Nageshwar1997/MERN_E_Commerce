import React from "react";
import { Box, Modal, Typography } from "@mui/material";
import RegisterForm from "./RegisterForm";
import { useLocation } from "react-router-dom";
import LoginForm from "./LoginForm";

const AuthModal = ({ open, handleClose }) => {
  const { pathname } = useLocation();

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 500,
    bgcolor: "background.paper",
    outline: "none",
    boxShadow: 24,
    p: 4,
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style} className="rounded">
        {pathname === "/login" ? <LoginForm /> : <RegisterForm />}
      </Box>
    </Modal>
  );
};

export default AuthModal;
