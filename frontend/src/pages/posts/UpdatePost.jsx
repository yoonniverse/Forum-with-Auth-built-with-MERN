import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Container } from "@mui/material";
import LoginIcon from "@mui/icons-material/Login";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Spinner from "../../components/Spinner";

import { readPost } from "../../features/posts/postsSlice";
import Header from "../../components/Header";
import PostForm from "../../components/post/PostForm";

const UpdateRecuitPage = () => {
  const dispatch = useDispatch();

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
    <>
      <Header title="Edit" icon={<LoginIcon />} />
      <Container maxWidth="lg">
        <PostForm orig={post} />
      </Container>
    </>
  );
};

export default UpdateRecuitPage;
