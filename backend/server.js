import path from "path";
import express from "express";
import dotenv from "dotenv";

import { errorHandler } from "./middleware/errorMiddleware.js";
import { connectDB } from "./config/db.js";
import postRoutes from "./routes/postRoutes.js";
import userRoutes from "./routes/userRoutes.js";

import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

dotenv.config();
const port = process.env.PORT;
connectDB();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/posts", postRoutes);
app.use("/api/users", userRoutes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/build")));
  app.all("*", (req, res) => {
    res.redirect("/");
  });
}

app.use(errorHandler);

app.listen(port, () => console.log(`Server started on port ${port}`));
