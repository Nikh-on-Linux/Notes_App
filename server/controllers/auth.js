import { ObjectId } from 'mongodb';
import { makeConnection, client } from './connector.js';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import bcrypt from "bcryptjs";

dotenv.config();

const salts = await bcrypt.genSalt(15);

const createUser = async (req, res) => {
  try {

    const database = await makeConnection({ collections: "Credentials", db: "Users" }).catch(console.dir);

    const userExist = await database.findOne({ email: req.body.email });

    if (!userExist) {
      await bcrypt.hash(req.body.password, salts).then(async (password) => {

        const data = {
          email: req.body.email,
          name: {
            firstname: req.body.firstname,
            lastname: req.body.lastname
          },
          password: password
        };

        const createUser = await database.insertOne(data);

        const findUser = await database.findOne({ email: data.email });
        console.log(findUser);
        const obj = findUser._id.toString();
        console.log(obj);
        client.close();
        console.log('client closed 1');

        const response = await fetch("http://localhost:3500/user/setuser", {
          method: "POST",
          headers: {
            'Content-Type': "application/json",
          },
          body: JSON.stringify({
            "userId": obj,
            lauda:"tera lauda"
          }),
          // body:{
          //   userid:obj
          // }
        })

        const serverData = await response.json();
        console.log(serverData);

        if (serverData.suc) {

          res.json({
            msg: "Account created",
            suc: true
          });

        }

        else{
          const database2 = await makeConnection({ collections: "Credentials", db: "Users" }).catch(console.dir);
          await database2.deleteOne({email:data.email}).then(res.json({msg:"Error in registering your account",suc:false}));
          client.close();
          console.log('client closed error')
        }


      })
        .catch(console.dir);

    }

    else {
      res.json({
        msg: "User already exsist",
        suc: false
      });
    }

  }

  catch (err) {
    res.json({ error: err });
  }

  finally {
    console.log('client closed');
  }
}




const loginUser = async (req, res) => {
  try {
    const data = req.body;

    const database = await makeConnection({ collections: "Credentials", db: "Users" }).catch(console.dir);

    const userid = await database.findOne({ email: data.email });

    await bcrypt.compare(req.body.password, userid.password)

      .then((match) => {

        if (match) {

          const token = jwt.sign({ email: userid.email , id:userid._id.toString() }, process.env.SECRETE_KEY);

          console.log(token);
          res.json({ msg: "Loggedin successfully", suc: true, token: token })

        }

        else {
          res.json({ msg: "Email or password is wrong", suc: false })
        }

      })
      .catch((err) => { res.json({ msg: "Email or password is wrong", suc: false }) })


  }
  catch (err) {
    res.json({ error: err });
  }

  finally {
    client.close();
    console.log('client closed');
  }
}



const lookemail = async (req, res) => {
  try {
    const database = await makeConnection({ collections: "Credentials", db: "Users" }).catch(console.dir);

    const userId = await database.findOne({ email: req.body.email });

    if (userId) {
      const response = await fetch('http://localhost:3500/mailer/sendmail', {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email: req.body.email,
          id: userId._id.toString()
        })
      })

      const data = await response.json();

      if (data && data.suc) {

        res.json({ msg: data.msg, suc: data.suc });
      }

      else {

        res.json({ msg: data.msg, suc: data.suc });
      }
    }

    else {
      res.json({ msg: "No user with that email is registered", suc: false })
    }
  }

  catch (err) {
    res.json({ error: err });
  }
  finally {
    client.close();
    console.log("Client closed");
  }
}



const resetPassword = async (req, res) => {
  try {

    const database = await makeConnection({ collections: "Credentials", db: "Users" }).catch(console.dir);

    await bcrypt.hash(req.body.password, salts)
      .then(async (password) => {

        const obgId = new ObjectId(req.body.id);

        const result = await database.updateOne({ _id: obgId }, { $set: { password: password } });
        console.log(req.body.id);

        if (!result) {
          throw "Invalid email address"
        }

      })

      .then(() => { res.json({ msg: "Updated password", suc: true }) })

      .catch(() => { res.json({ msg: "Failed to update password", suc: false }); })

  }

  catch (err) {
    res.json({ error: err });
  }

  finally {
    client.close();
    console.log("Client closed");
  }

}




export { createUser, loginUser, lookemail, resetPassword };
