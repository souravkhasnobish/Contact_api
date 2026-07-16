import express from "express";
const app = express();
import mongoose from "mongoose";
import bodyparser from "express";
import userRouter from "./Routes/user.js";
import contactRouter from "./Routes/contact.js";
import { config } from "dotenv";
app.use(bodyparser.json());

//.env Setup
config({path:".env"})

//User Route
app.use("/api/user", userRouter);

//Contact Route
app.use("/api/contact", contactRouter);

//Connecting MongoDb
mongoose
  .connect(
    process.env.MONGO_URI
   ,
    {
      dbName: "NodejsMasteryCourse",
    },
  )
  .then(() => {
    console.log("Database connected sucessfully");
  })
  .catch((err) => {
    console.log(err);
  });

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
