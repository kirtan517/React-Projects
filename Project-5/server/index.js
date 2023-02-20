import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import postRoutes from "./routes/posts.js";

const app = express();

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

app.use("/posts", postRoutes);

const CONNECT_URL = "mongodb://localhost:27017/Projects";
const PORT = process.env.PORT || 8000;

mongoose
  .connect(CONNECT_URL)
  .then(() =>
    app.listen(PORT, () => console.log(`Server listening on the Port ${PORT}`))
  )
  .catch((error) => console.log(`Error encountered : ${error.message}`));
