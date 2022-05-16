import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  Avatar,
  Box,
  Typography,
  TextField,
  FormControlLabel,
  Checkbox,
  Button,
  Stack,
} from "@mui/material";

import { register, login, reset } from "../features/auth/authSlice";
import Spinner from "./Spinner";

const AuthForm = ({ isRegister }) => {
  let onSubmit;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  if (isRegister) {
    onSubmit = (e) => {
      e.preventDefault();
      if (password !== password2) {
        toast.error("Passwords do not match");
      } else {
        const userData = {
          name,
          email,
          password,
        };
        dispatch(register(userData));
      }
    };
  } else {
    onSubmit = (e) => {
      e.preventDefault();
      const userData = {
        email,
        password,
      };
      dispatch(login(userData));
      dispatch(reset());
    };
  }

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });
  const { name, email, password, password2 } = formData;

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    if (isSuccess || user) {
      navigate("/");
    }
    dispatch(reset());
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <Box
      sx={{
        alignItems: "center",
        width: {
          xs: "95%",
          sm: 500,
        },
        mx: "auto",
      }}
    >
      <Box component="form" onSubmit={onSubmit} noValidate sx={{ mt: 1 }}>
        <TextField
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email"
          name="email"
          autoFocus
          onChange={onChange}
          value={email}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
          type="password"
          id="password"
          onChange={onChange}
          value={password}
        />
        {isRegister && (
          <>
            <TextField
              margin="normal"
              required
              fullWidth
              id="password2"
              label="Confirm Password"
              type="password"
              name="password2"
              onChange={onChange}
              value={password2}
            />{" "}
            <TextField
              margin="normal"
              required
              fullWidth
              id="name"
              label="Name"
              name="name"
              onChange={onChange}
              value={name}
            />
          </>
        )}
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          {isRegister ? "Register" : "Login"}
        </Button>
      </Box>
    </Box>
  );
};

export default AuthForm;
