import express from 'express';
import bodyparser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';

import authRouter from './routes/auth.js';
import mailRouter from "./routes/mailer.js";
import userRouter from "./routes/user.js";


dotenv.config();
const app = express();

const corsOptions = {origin:"https://notes-app-nikhilhegde-q05ow7i9i-nikh-on-linuxs-projects.vercel.app"};

app.use(cors(corsOptions));
app.use(bodyparser.json({extended:false,limit:"50mb"}));
app.use(bodyparser.urlencoded({extended:false,limit:"50mb"}));


app.use('/auth',authRouter);
app.use('/mailer',mailRouter);
app.use('/user',userRouter)

app.get('/',(req,res)=>{
  res.json({msg:"Connected successfully",suc:true})
})

app.listen(process.env.PORT,()=>{console.log(`server running at ${process.env.PORT}`)})