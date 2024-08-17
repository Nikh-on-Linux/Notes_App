import express from "express";
import { genMail } from "../controllers/mailgen.js";
const router = express.Router();

router.post('/sendmail',genMail);

export default router;