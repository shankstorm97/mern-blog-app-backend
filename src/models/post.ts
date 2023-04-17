import { InferSchemaType, Schema, model } from "mongoose";

const postSchema = new Schema(
  {
    mainTitle: { type: String, required: true },
    intro: { type: String },
    description: { type: String, required: true },
    writtenBy: { type: String },
  },
  { timestamps: true }
);

type PostType = InferSchemaType<typeof postSchema>;

export default model<PostType>("Post", postSchema);
