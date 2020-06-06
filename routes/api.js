import express from "express";
import UserController from "../controllers/UserController";
import SignInController from "../controllers/authController/LoginController";
import { checkAuth } from "../middlewares/auth";

const ROUTER = express.Router();

// ROUTER.post("/login", LoginController.login);

ROUTER.post("/sign-in", SignInController.signIn);

//User Controller
ROUTER.post("/adduser", UserController.addUser);
ROUTER.get("/getalluser", UserController.getAllUsers);
ROUTER.put("/updateuser", checkAuth, UserController.updateUserDetails);
ROUTER.delete("/deletuser/:userId", UserController.deleteuser);

module.exports = ROUTER;
