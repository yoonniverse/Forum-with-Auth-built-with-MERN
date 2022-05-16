import React from "react";

import LoginIcon from "@mui/icons-material/Login";
import { Container } from "@mui/material";

import Header from "../../components/Header";
import PostForm from "../../components/post/PostForm";

const CreatePost = () => {
  return (
    <>
      <Header title="write" icon={<LoginIcon />} />
      <Container maxWidth="lg">
        <PostForm />
      </Container>
    </>
  );
};

export default CreatePost;
