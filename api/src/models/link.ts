import mongoose, { Document } from "mongoose";

export interface ILink extends Document {
  url: string,
  shortFormUrl: string
}

const linkSchema = new mongoose.Schema<ILink>({
  url: {
    type: String,
    required: true,
    index: true,
  },
  shortFormUrl: {
    type: String,
    required: true,
    unique: true,
  },
});

const linkModel = mongoose.model("Link", linkSchema);

export default linkModel;
