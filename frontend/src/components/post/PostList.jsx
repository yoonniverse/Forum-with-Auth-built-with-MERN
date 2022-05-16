import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import dayjs from "dayjs";

import {
  List,
  ListItem,
  Divider,
  ListItemAvatar,
  Avatar,
  Typography,
  Paper,
} from "@mui/material/";

import {
  deletePost,
  readPosts,
  updatePost,
} from "../../features/posts/postsSlice";

import PostForm from "./PostForm";
import { Link } from "react-router-dom";
import { Box } from "@mui/system";

const PostListItem = ({ post }) => {
  return (
    <Box sx={{ mb: 1 }}>
      <ListItem
        component={Link}
        to={`posts/read/${post._id}`}
        alignItems="center"
      >
        <ListItemAvatar>
          <Avatar alt="" src="">
            {post.user.name.slice(0, 1)}
          </Avatar>
        </ListItemAvatar>
        <List>
          <Typography variant="h6">{post.title}</Typography>
          <Typography variant="body2">
            {post.user.name} - {dayjs(post.createdAt).format("YY년 MM월 DD일")}
          </Typography>
        </List>
      </ListItem>
      <Divider variant="inset" />
    </Box>
  );
};

const PostList = () => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts.posts);

  useEffect(() => {
    dispatch(readPosts());
  }, []);

  return (
    <List>
      {posts.map((post) => (
        <PostListItem key={post._id} post={post} />
      ))}
    </List>
  );
};

export default PostList;
