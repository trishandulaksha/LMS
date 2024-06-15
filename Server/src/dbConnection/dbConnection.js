import mongoose from "mongoose";

export const databaseSetup = async () => {
  await mongoose.connect(process.env.DB_URI);
};
