import express from "express";
import cors from "cors";
import "./dbConnection/db";
import authRouter from "./routes/auth";

const app = express();
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/api", authRouter);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log("Server up and running at " + `http://localhost:${PORT}/`);
});
