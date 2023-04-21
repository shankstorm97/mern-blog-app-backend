"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const mongoose_1 = __importDefault(require("mongoose"));
const validateEnv_1 = __importDefault(require("./utils/validateEnv"));
mongoose_1.default
    // .connect(env.MONGO_CONNECTION_STRING)
    .connect("mongodb+srv://prabhdeepsinngh:p52z9mvSdBGJLoRe@mern-blog.fb5ptu7.mongodb.net/Apphole?retryWrites=true&w=majority")
    .then(() => {
    console.log("Mongoose connected");
    app_1.default.listen(validateEnv_1.default.PORT, () => {
        console.log("port runnn");
    });
})
    .catch(console.error);
