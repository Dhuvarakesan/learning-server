import { Router } from "express";
import { authenticateUser } from "../controllers/authentication.controller";

const publicRoutes = Router();
publicRoutes.use("/authenticate", authenticateUser);

export default publicRoutes;