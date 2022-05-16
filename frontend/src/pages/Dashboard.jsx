import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Container, Button, Box, ButtonGroup } from "@mui/material";
import { Link } from "react-router-dom";

import EmojiPeopleIcon from "@mui/icons-material/EmojiPeople";

import PostForm from "../components/post/PostForm";
import PostList from "../components/post/PostList";
import Header from "../components/Header";

const Dashboard = () => {
  const { user } = useSelector((state) => state.auth);

  return (
    <>
      <Header
        title="Community Forum"
        icon={<EmojiPeopleIcon fontSize="large" />}
      />
      <Container maxWidth="lg">
        <Box sx={{ alignItems: "center", my: 5, textAlign: "center" }}>
          {user ? (
            <Button
              component={Link}
              to="posts/create"
              variant="contained"
              color="secondary"
            >
              Write
            </Button>
          ) : (
            <ButtonGroup>
              <Button
                component={Link}
                to="login"
                variant="contained"
                color="secondary"
              >
                Login
              </Button>
              <Button
                component={Link}
                to="register"
                variant="contained"
                color="secondary"
              >
                Register
              </Button>
            </ButtonGroup>
          )}
        </Box>

        <PostList />
      </Container>
    </>
  );
};

export default Dashboard;
