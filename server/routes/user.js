import express from "express";

import { createFile, fetchUser, setUser, loadHome, userInfo , jwtBreakdown} from "../controllers/user.js";

const router = express.Router();

router.post("/info", fetchUser);
router.post("/loadHome", loadHome);
router.post("/userinfo", userInfo);
router.post("/setuser", setUser);
router.post("/createfile", createFile);
router.post("/jwtbreakdown", jwtBreakdown);

export default router;