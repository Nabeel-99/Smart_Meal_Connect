import User from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { validate, validateUpdate } from "../utils/validation.js";
import UserDashboard from "../models/userDashboardModel.js";
import SavedRecipe from "../models/savedRecipeModel.js";
import UserPost from "../models/userPostModel.js";
import Metrics from "../models/metricsModel.js";
import Pantry from "../models/pantryModel.js";
import Recipe from "../models/recipeModel.js";
import path from "path";
import * as fs from "node:fs/promises";
import { verifyEmailToken } from "./authController.js";
// create user
const __dirname = path.resolve();
export const createUser = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email: email });
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }
    // check if there is no validation error
    const { error } = validate(req.body);
    if (error) {
      return res.status(401).json({ message: error.details[0].message });
    }
    // use salt for enhanced security and bcrypt to hash the password
    const salt = await bcrypt.genSalt(Number(process.env.SALT));
    const hashPassword = await bcrypt.hash(req.body.password, salt);

    // create user
    const newUser = new User({ ...req.body, password: hashPassword });
    await newUser.save();
    // send email
    const emailResponse = await verifyEmailToken(req);
    if (emailResponse.status !== 200) {
      return res
        .status(emailResponse.status)
        .json({ message: emailResponse.message });
    }
    return res.status(200).json({ message: "user created successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

// login user
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(400).json({ message: "Email not registered." });
    }
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(400).json({
        message:
          "Sorry, your password was incorrect. Please double-check your password.",
      });
    }
    // user token
    const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, {
      expiresIn: "5d",
    });

    // set token in cookies
    res.cookie("token", token, {
      httpOnly: true,
    });

    const isNewUser = user.isNewUser;

    if (isNewUser) {
      user.isNewUser = false;
      await user.save();
    }

    return res
      .status(200)
      .json({ message: "log in successful", isNewUser: isNewUser, user });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

// get user Data
export const getUserData = async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json({ message: "Authenticated", user });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
// logout user
export const logout = (req, res) => {
  try {
    res.clearCookie("token");
    return res.status(200).json({ message: "log out successful" });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

// update user details
export const updateUser = async (req, res) => {
  try {
    // current user
    const userId = req.userId;

    const { error } = validateUpdate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }
    const { firstName, lastName, email, password } = req.body;

    if (email) {
      const existingUser = await User.findOne({ email: email });
      if (existingUser && existingUser._id.toString() !== userId) {
        return res.status(400).json({ message: "Email already exists" });
      }
    }

    let hashPassword;
    if (password) {
      const salt = await bcrypt.genSalt(Number(process.env.SALT));
      hashPassword = await bcrypt.hash(password, salt);
    }
    // update the user details
    const updatedData = {
      ...(firstName && { firstName }),
      ...(lastName && { lastName }),
      ...(email && { email }),
      ...(password && { password: hashPassword }),
    };

    const updatedUser = await User.findByIdAndUpdate(userId, updatedData, {
      new: true,
    });

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    return res
      .status(200)
      .json({ message: "User updated successfully", user: updatedUser });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

// delete user
export const deleteUser = async (req, res) => {
  try {
    const userId = req.userId;
    const deletedUser = await User.findByIdAndDelete(userId);
    const userDashboard = await UserDashboard.findOneAndDelete({
      userId: userId,
    });
    const recipeIds = [
      ...userDashboard.generatedMeals.breakfast.map((meal) => meal.recipeId),
      ...userDashboard.generatedMeals.lunch.map((meal) => meal.recipeId),
      ...userDashboard.generatedMeals.dinner.map((meal) => meal.recipeId),
    ];

    for (const recipeId of recipeIds) {
      const recipe = await Recipe.findById(recipeId);
      if (recipe && recipe.images) {
        for (const image of recipe.images) {
          const filePath = path.join(
            __dirname,
            "uploads",
            path.basename(image)
          );
          try {
            await fs.unlink(filePath);
          } catch (error) {
            console.log(`error deleting image: ${image}}`, error);
          }
        }
      }
      await Recipe.findByIdAndDelete(recipeId);
    }

    const userPosts = await UserPost.find({ userId: userId }, "recipeId");
    for (const post of userPosts) {
      await Recipe.findByIdAndDelete(post.recipeId);
    }
    await UserPost.deleteMany({ userId: userId });

    await SavedRecipe.findOneAndDelete({ userId: userId });
    await Metrics.findOneAndDelete({ userId: userId });
    await Pantry.findOneAndDelete({ userId: userId });
    if (deletedUser) {
      res.clearCookie("token");
    }
    return res.status(200).json(deletedUser);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
