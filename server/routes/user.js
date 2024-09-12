import express from "express";

import { createFile, fetchUser, setUser, loadHome, userInfo, jwtBreakdown, deleteFile, cloneFile, renameFile, loadFile, saveFile } from "../controllers/user.js";

const router = express.Router();

router.post("/info", fetchUser);
router.post("/loadHome", loadHome);
router.post("/userinfo", userInfo);
router.post("/setuser", setUser);
router.post("/createfile", createFile);
router.post("/clonefile", cloneFile);
router.patch("/renamefile", renameFile);
router.post("/jwtbreakdown", jwtBreakdown);
router.delete('/deletefile', deleteFile);
router.post('/loadfile', loadFile);
router.post('/savefile',saveFile)

export default router;