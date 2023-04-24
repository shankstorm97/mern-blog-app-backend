"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletePost = exports.updatePost = exports.createPost = exports.getPost = exports.getPosts = void 0;
const post_1 = __importDefault(require("../models/post"));
const mongoose_1 = __importDefault(require("mongoose"));
const http_errors_1 = __importDefault(require("http-errors"));
const getPosts = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const posts = yield post_1.default.find().exec();
        res.status(200).json(posts);
    }
    catch (error) {
        next(error);
    }
});
exports.getPosts = getPosts;
const getPost = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const postId = req.params.postId;
    try {
        if (!mongoose_1.default.isValidObjectId) {
            throw (0, http_errors_1.default)(400, "Invalid Post Id");
        }
        const post = yield post_1.default.findById(postId).exec();
        if (!post) {
            throw (0, http_errors_1.default)(404, "Post not found");
        }
        res.status(200).json(post);
    }
    catch (error) {
        next(error);
    }
});
exports.getPost = getPost;
const createPost = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const mainTitle = req.body.mainTitle;
    const description = req.body.description;
    const intro = req.body.intro;
    const writtenBy = req.body.writtenBy;
    try {
        if (!mainTitle) {
            throw (0, http_errors_1.default)(400, "Post must have a title");
        }
        const newNote = yield post_1.default.create({
            mainTitle: mainTitle,
            description: description,
            intro: intro,
            writtenBy: writtenBy,
        });
        res.status(201).json(newNote);
    }
    catch (error) {
        next(error);
    }
});
exports.createPost = createPost;
const updatePost = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const newMainTitle = req.body.mainTitle;
    const newDescription = req.body.description;
    const newIntro = req.body.intro;
    const newWrittenBy = req.body.writtenBy;
    const postId = req.params.postId;
    try {
        if (!mongoose_1.default.isValidObjectId) {
            throw (0, http_errors_1.default)(400, "Invalid Post Id");
        }
        if (!newMainTitle) {
            throw (0, http_errors_1.default)(400, "Please enter a title for updation");
        }
        if (!newDescription) {
            throw (0, http_errors_1.default)(400, "Please enter a description for updation");
        }
        const post = yield post_1.default.findById(postId).exec();
        if (!post) {
            throw (0, http_errors_1.default)(404, "post not found");
        }
        post.mainTitle = newMainTitle;
        post.description = newDescription;
        const updatedPost = yield post.save();
        res.status(200).json(updatedPost);
    }
    catch (error) {
        next(error);
    }
});
exports.updatePost = updatePost;
// deletePost function
const deletePost = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const postId = req.params.postId;
    try {
        if (!mongoose_1.default.isValidObjectId) {
            throw (0, http_errors_1.default)(400, "Invalid Post Id");
        }
        yield post_1.default.findByIdAndRemove(postId).exec();
    }
    catch (error) {
        next(error);
    }
});
exports.deletePost = deletePost;
