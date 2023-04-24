import app from "./app";
import mongoose from "mongoose";
import env from "./utils/validateEnv";

mongoose
  .connect(env.MONGO_CONNECTION_STRING)
  .then(() => {
    console.log("Mongoose client connected");

    app.listen(env.PORT, () => {
      console.log("Server is running on port: 5001");
    });
  })
  .catch(console.error);
