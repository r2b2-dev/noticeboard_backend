import mongoose from "mongoose";

mongoose
  .connect("mongodb://localhost/notice_board", {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => console.log("database running...."))
  .catch((error) => console.log(error));
