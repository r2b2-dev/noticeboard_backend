import express from "express";
import UserController from "../controllers/UserController";
import SignInController from "../controllers/authController/LoginController";
import SignOutController from "../controllers/authController/SignOutController";
import { checkAuth } from "../middlewares/auth";

const ROUTER = express.Router();

// ROUTER.post("/login", LoginController.login);

ROUTER.post("/sign-in", SignInController.signIn);
ROUTER.post("/sign-out", checkAuth, SignOutController.signOut);
ROUTER.post("/sign-out-all", checkAuth, SignOutController.signOutAll);

//admin routes
ROUTER.post("/adduser", UserController.addUser);
ROUTER.get("/getalluser", UserController.getAllUsers);
ROUTER.put("/updateuser", checkAuth, UserController.updateUserDetails);
ROUTER.delete("/deletuser/:userId", UserController.deleteuser);

module.exports = ROUTER;
