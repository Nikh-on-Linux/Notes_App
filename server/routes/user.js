import express from "express";

import { createFile, fetchUser, setUser } from "../controllers/user.js";

const router = express.Router();

router.post("/info", fetchUser);
router.post("/setuser", setUser);
router.post("/createfile", createFile);

export default router;