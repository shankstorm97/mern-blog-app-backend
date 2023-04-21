"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
// import mongoose from "mongoose";
const validateEnv_1 = __importDefault(require("./utils/validateEnv"));
// mongoose
//   .connect(env.MONGO_CONNECTION_STRING)
//   .then(() => {
//     console.log("Mongoose connected");
//     app.listen(env.PORT, () => {
//       console.log("port runnn");
//     });
//   })
//   .catch(console.error);
app_1.default.listen(validateEnv_1.default.PORT, () => {
    console.log("port runnn");
});
