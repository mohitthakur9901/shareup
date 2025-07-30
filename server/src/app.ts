import express from "express";
import cors from "cors";
import { clerkMiddleware } from '@clerk/express'

const app = express();

app.use(cors());
app.use(clerkMiddleware());
app.use(express.json());



app.get("/", (req, res) => {
    res.status(200).json({
        message: "Hello"
    })
})

export default app