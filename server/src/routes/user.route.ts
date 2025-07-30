import express from "express"
import { syncUser , getCurrentUser , getUserProfile, updateUser } from "../controllers/user.controller"
import upload from "../middlewares/upload.middleware"

const router = express.Router()



router.post("/syncUser" , syncUser)
router.get("/getCurrentUser" , getCurrentUser)
router.get("/getUserProfile/:username" , getUserProfile)
router.put("/updateUser" , upload.single("profilePicture") , updateUser)



export default router



