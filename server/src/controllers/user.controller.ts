import { getAuth } from "@clerk/express";
import { clerkClient } from "@clerk/express";
import User from "../models/user.models";
import AsyncHandler from "../utils/Asynchandler";
import ApiError from "../utils/ApiError";
import ApiResponse from "../utils/ApiResponse";


export const syncUser = AsyncHandler(async (req: any, res: any) => {
  const { userId } = getAuth(req);
  try {
    if (!userId) {
      return res.status(400).json(new ApiError(400, "User not found"));
    }
    const existingUser = await User.findOne({ clerkId: userId });
    if (existingUser) {
      return res
        .status(200)
        .json(new ApiResponse(200, existingUser, "User already exists"));
    }
    const clerkUser = await clerkClient.users.getUser(userId);

    const newUser = await User.create({
      clerkId: userId,
      email: clerkUser.emailAddresses[0].emailAddress,
      firstName: clerkUser.firstName,
      lastName: clerkUser.lastName,
      username: clerkUser.username,
      profilePicture: clerkUser.imageUrl || " ",
    });
    await newUser.save();
    return res
      .status(200)
      .json(new ApiResponse(200, newUser, "User created successfully"));
  } catch (error) {
    return res
      .status(500)
      .json(new ApiError(500, "Error While Creating User "));
  }
});


export const updateUser = AsyncHandler(async (req: any, res: any) => {
  try {
    const { userId } = getAuth(req);
    if (!userId) {
      return res.status(400).json(new ApiError(400, "User not found"));
    }
    const user = await User.findOneAndUpdate({ clerkId: userId }, req.body, {
      new: true,
    });
    return res
      .status(200)
      .json(new ApiResponse(200, user, "User updated successfully"));
  } catch (error) {
    return res
      .status(500)
      .json(new ApiError(500, "Error While Updating User "));
  }
});


export const getUserProfile = AsyncHandler(async (req: any, res: any) => {
  try {
    const { username } = req.params;
    const user = await User.findOne({ username });
    return res
      .status(200)
      .json(new ApiResponse(200, user, "User found successfully"));
  } catch (error) {
    return res
      .status(500)
      .json(new ApiError(500, "Error While Getting User "));
  }
});


export const getCurrentUser = AsyncHandler(async (req: any, res: any) => {
  try {
    const { userId } = getAuth(req);
    if (!userId) {
      return res.status(400).json(new ApiError(400, "User not found"));
    }
    const user = await User.findOne({ clerkId: userId });
    return res
      .status(200)
      .json(new ApiResponse(200, user, "User found successfully"));
  } catch (error) {
    return res
      .status(500)
      .json(new ApiError(500, "Error While Getting User "));
  }
});
