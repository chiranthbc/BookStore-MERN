import express, { request, response } from "express";
import { PORT, mongoDBURL } from "../backend/config.js";
import mongoose from "mongoose";
import { Book } from "../backend/models/bookModel.js";
import booksRouter from "./routes/booksRouter.js";
import cors from "cors";

const app = express();

// middleware for handling CORS policy
// option1: Allow All Origins with Default of cors()
app.use(cors());

//option2: Alloow custom Origins
// app.use(
//   cors({
//     origin: "http://localhost:3000",
//     methods: ["GET", "POST", "PUT", "DELETE"],
//     allowedHeaders: ["Content-Type"],
//   })
// );

app.get("/", (request, response) => {
  console.log(request);
  response.status(223).send(`Welocome to MERN stack project`);
});

// middleware for parsing request Body

app.use(express.json());

// middleware
app.use("/books", booksRouter);

mongoose
  .connect(mongoDBURL)
  .then(() => {
    console.log(`App connected to database`);
    app.listen(PORT, () => {
      console.log(`App is listening to PORT : ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
