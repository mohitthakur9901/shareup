import app from "./app";
import { v2 as cloudinary } from "cloudinary";
import { config } from "dotenv";
import connectDb from "./db/dbConnect";

config({
  path: "./.env",
});

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

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
