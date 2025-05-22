import express from "express";
import { register,
    login, 
    getProfile, 
    updateProfile, 
    deleteProfile
 } from "../controllers/authController";
 import { protect } from "../middleware/authMiddleware";
 import { validateBody } from "../middleware/validate";
import { registerSchema,
    loginSchema
 } from "../schemas/authSchema";
 const router = express.Router();

 router.post("/register", validateBody(registerSchema), register);
 router.post("/login", validateBody(loginSchema), login);
 router.get("/profile", protect, getProfile);
 router.put("/profile", protect, updateProfile);
 router.delete("/profile", protect, deleteProfile);

 export default router;