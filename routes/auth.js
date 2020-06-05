import express from "express";
import RegisterController from "../controllers/RegisterController";
import LoginController from "../controllers/LoginController";

const ROUTER = express.Router();

ROUTER.post("/register", RegisterController.register);
ROUTER.post("/login", LoginController.login);

module.exports = ROUTER;
