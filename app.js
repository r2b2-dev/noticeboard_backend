import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const PORT = 7777;

app.listen(
  PORT,
  console.log("Server up and running at " + `http://localhost:${PORT}/`)
);
