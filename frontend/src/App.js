import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { createTheme, CssBaseline } from "@mui/material";
import { ThemeProvider } from "@emotion/react";

import NavBar from "./components/NavBar";
import DashboardPage from "./pages/Dashboard";
import LoginPage from "./pages/auth/Login";
import RegisterPage from "./pages/auth/Register";
import ReadPostPage from "./pages/posts/ReadPost";
import CreatePostPage from "./pages/posts/CreatePost";
import UpdatePostPage from "./pages/posts/UpdatePost";

const theme = createTheme({
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        a: { color: "inherit", textDecoration: "inherit" },
      },
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/" element={<DashboardPage />}></Route>
          <Route path="/login" element={<LoginPage />}></Route>
          <Route path="/register" element={<RegisterPage />}></Route>
          <Route path="/posts/read/:id" element={<ReadPostPage />}></Route>
          <Route path="/posts/create" element={<CreatePostPage />}></Route>
          <Route path="/posts/update/:id" element={<UpdatePostPage />}></Route>
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </ThemeProvider>
  );
}

export default App;
