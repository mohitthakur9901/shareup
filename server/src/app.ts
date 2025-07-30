import express from "express";
import cors from "cors";
import { clerkMiddleware } from "@clerk/express";
import { config } from "dotenv";
import { v2 as cloudinary } from "cloudinary";
import connectDb from "./db/dbConnect";

import userRoute from "./routes/user.route";

const app = express();

config({
  path: "./.env",
});

app.use(cors());
app.use(
  clerkMiddleware({
    publishableKey: process.env.CLERK_PUBLISHABLE_KEY,
    secretKey: process.env.CLERK_SECRET_KEY,
  })
);
app.use(express.json());

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

app.get("/health", (req, res) => {
  res.status(200).json({ message: "Server is healthy" });
});

app.use("/api/v1/user", userRoute);

connectDb()
  .then(() => {
    app.listen(process.env.PORT || 3000, () => {
      console.log(`server is running on http://localhost:${process.env.PORT}`);
    });
    app.on("error", (err: any) => {
      console.log(err);
    });
  })
  .catch((err) => {
    console.log(err);
    process.exit(1);
  });
