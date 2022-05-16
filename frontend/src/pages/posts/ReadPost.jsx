import { Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Container, Box, Button } from "@mui/material";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";

import Spinner from "../../components/Spinner";
import { readPost, deletePost } from "../../features/posts/postsSlice";

const Post = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { posts } = useSelector((state) => state.posts);
  const { user } = useSelector((state) => state.auth);

  const { id } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    let exist = false;
    for (const r of posts) {
      if (r._id === id) {
        exist = true;
        setPost(r);
        break;
      }
    }
    if (!exist) {
      dispatch(readPost(id));
    }
  }, [posts]);
  if (!post) {
    return <Spinner />;
  }
  return (
    <Container maxWidth="lg" sx={{ pt: 4 }}>
      <Typography variant="h4" sx={{ pb: 4 }}>
        {post.title}
      </Typography>
      <Typography variant="h6" sx={{ pb: 3 }}>
        {post.user.name}
      </Typography>
      <Box sx={{ pb: 3 }}>
        <Typography variant="body2">
          written: {dayjs(post.createdAt).format("YY/MM/DD")}
        </Typography>
        <Typography variant="body2">
          editted: {dayjs(post.createdAt).format("YY/MM/DD")}
        </Typography>
      </Box>
      {user && user.id === post.user._id && (
        <Box sx={{ pb: 3 }}>
          <Button
            color="error"
            onClick={() => {
              dispatch(deletePost(post._id));
              navigate("/");
            }}
          >
            delete
          </Button>
          <Button
            color="info"
            onClick={() => {
              navigate(`/posts/update/${id}`);
            }}
          >
            edit
          </Button>
        </Box>
      )}
      <Typography variant="body">{post.content}</Typography>
    </Container>
  );
};

export default Post;
