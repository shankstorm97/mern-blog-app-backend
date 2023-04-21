"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const postSchema = new mongoose_1.Schema({
    mainTitle: { type: String, required: true },
    intro: { type: String },
    description: { type: String, required: true },
    writtenBy: { type: String },
}, { timestamps: true });
exports.default = (0, mongoose_1.model)("Post", postSchema);
