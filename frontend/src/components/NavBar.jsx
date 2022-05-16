import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { Box, AppBar, Button, Typography, Toolbar } from "@mui/material";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import HowToRegIcon from "@mui/icons-material/HowToReg";

import { logout, reset } from "../features/auth/authSlice";

const NavBar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate("/");
  };
  return (
    <>
      <AppBar color="background">
        <Toolbar
          sx={{
            justifyContent: "space-between",
            maxWidth: "lg",
            width: "100%",
            mx: "auto",
          }}
        >
          <Box component={Link} to="/">
            <Typography variant="h6">Forum</Typography>
          </Box>
          <Box>
            {user ? (
              <Button onClick={onLogout}>
                <LogoutIcon />
                &nbsp;logout
              </Button>
            ) : (
              <>
                <Button component={Link} to="/login">
                  <LoginIcon />
                  &nbsp;login
                </Button>
                <Button component={Link} to="/register">
                  <HowToRegIcon />
                  &nbsp;register
                </Button>
              </>
            )}
          </Box>
        </Toolbar>
      </AppBar>
      <Toolbar />
    </>
  );
};

export default NavBar;
