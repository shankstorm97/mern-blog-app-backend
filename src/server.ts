import app from "./app";
import mongoose from "mongoose";
import env from "./utils/validateEnv";

mongoose
  // .connect(env.MONGO_CONNECTION_STRING)
  .connect(
    "mongodb+srv://prabhdeepsinngh:p52z9mvSdBGJLoRe@mern-blog.fb5ptu7.mongodb.net/Apphole?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("Mongoose connected");

    app.listen(env.PORT, () => {
      console.log("port runnn");
    });
  })
  .catch(console.error);
