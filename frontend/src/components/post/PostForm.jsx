import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createPost, updatePost } from "../../features/posts/postsSlice";

import {
  Avatar,
  Box,
  Typography,
  TextField,
  FormControlLabel,
  Checkbox,
  Button,
  Grid,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { useNavigate } from "react-router-dom";

const PostForm = ({ orig = null }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const initPostData = { title: "", content: "", ...orig };
  const [postData, setPostData] = useState(initPostData);
  const { title, content } = postData;

  const onChange = (e) => {
    setPostData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (orig) {
      dispatch(updatePost(postData));
    } else {
      dispatch(createPost(postData));
    }
    navigate("/");
  };
  return (
    <Box
      sx={{
        alignItems: "center",
      }}
    >
      <Box component="form" onSubmit={onSubmit} noValidate sx={{ mt: 1 }}>
        <TextField
          margin="normal"
          required
          fullWidth
          id="title"
          label="title"
          name="title"
          autoFocus
          onChange={onChange}
          value={title}
        />
        <TextField
          margin="normal"
          multiline
          minRows={5}
          required
          fullWidth
          id="content"
          label="content"
          name="content"
          onChange={onChange}
          value={content}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          {orig ? "Edit" : "Post"}
        </Button>
      </Box>
    </Box>
  );
};

export default PostForm;
