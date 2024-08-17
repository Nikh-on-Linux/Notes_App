import express from 'express';

import {createUser , loginUser  , lookemail, resetPassword} from '../controllers/auth.js';

const router = express.Router();


router.post("/login", loginUser);
router.post("/signup", createUser);
router.post("/forgotpassword",lookemail);
router.post("/resetpassword",resetPassword);


export default router;