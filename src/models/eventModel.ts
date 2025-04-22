import mongoose, { Schema, Document } from "mongoose";

export interface IEvent extends Document {
  id: string;
  user_id: string;
  name: string;
  datetime: Date;
  location: string;
  description: string;
}

const eventSchema: Schema = new Schema(
  {
    user_id: { type: String, required: true }, // Added user_id
    name: { type: String, required: true },
    datetime: { type: Date, required: true, unique: true },
    location: { type: String, required: true },
    description: { type: String, required: true },
  },
  { timestamps: true }
);

export const EventModel = mongoose.model<IEvent>("Event", eventSchema);
