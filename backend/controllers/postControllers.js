import asyncHandler from "express-async-handler";
import Post from "../model/postModel.js";
import User from "../model/userModel.js";

// @desc Read posts
// @route GET /api/posts
// @access Public
export const readPosts = asyncHandler(async (req, res) => {
  const posts = await Post.find().populate("user", ["name", "id"]);
  res.status(200).json(posts);
});

// @desc Read post
// @route GET /api/posts/:id
// @access Public
export const readPost = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id).populate("user", [
    "name",
    "id",
  ]);
  res.status(200).json(post);
});

// @desc Create post
// @route POST /api/posts
// @access Private
export const createPost = asyncHandler(async (req, res) => {
  const post = new Post({
    title: req.body.title,
    content: req.body.content,
    user: req.user.id,
  });
  await post.save();
  res.status(200).json({ ...post, user: req.user });
});

// @desc Update post
// @route PATCH /api/posts
// @access Private
export const updatePost = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (!post) {
    res.status(400);
    throw new Error("Post not found");
  }
  if (req.user.id !== post.user.toString()) {
    res.status(401);
    throw new Error("You are trying to update different user's post");
  }
  post.title = req.body.title;
  post.content = req.body.content;
  await post.save();
  res.status(200).json({ ...post, user: req.user });
});

// @desc Delete post
// @route DELETE /api/posts
// @access Private
export const deletePost = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (!post) {
    res.status(400);
    throw new Error("Post not found");
  }
  if (req.user.id !== post.user.toString()) {
    res.status(401);
    throw new Error("You are trying to delete different user's post");
  }
  await post.remove();
  res.status(200).json({ id: req.params.id });
});
