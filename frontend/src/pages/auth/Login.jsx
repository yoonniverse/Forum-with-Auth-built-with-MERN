import React from "react";

import LoginIcon from "@mui/icons-material/Login";

import Header from "../../components/Header";
import AuthForm from "../../components/AuthForm";

const Login = () => {
  return (
    <>
      <Header title="Welcome back" icon={<LoginIcon />} />
      <AuthForm isRegister={false} />
    </>
  );
};

export default Login;
