import { Router } from "express";
import { signin, signup } from "../controllers/auth.controller.js";

const authRouter = Router();

authRouter.post("/signin", signin);
authRouter.post("/signup", signup);

export default authRouter;
