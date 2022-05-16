import React from "react";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import AuthForm from "../../components/AuthForm";
import Header from "../../components/Header";

const Register = () => {
  return (
    <>
      <Header title="Start now" icon={<HowToRegIcon />} />
      <AuthForm isRegister={true} />
    </>
  );
};

export default Register;
