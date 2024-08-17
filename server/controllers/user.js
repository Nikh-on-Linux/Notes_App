import { makeConnection, client } from "./connector.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { ObjectId } from "mongodb";

dotenv.config();


const fetchUser = async (req, res) => {

  // try {

  await jwt.verify(req.body.token, process.env.SECRETE_KEY, async (error, decoded) => {

    // try {

    const database = await makeConnection({ collections: "Credentials", db: "Users" }).catch(console.dir);

    if (!error) {

      const userData = await database.findOne({ email: decoded.email }, { projection: { password: 0 } });
      const filesdb = await makeConnection({ db: "Docs", collections: decoded.id }).catch(console.dir);

      const filesAr = filesdb.find({ type: 'file' });

      userData ? res.json({ msg: "Fetching complete", userObj: { userdata: userData, files: filesAr }, suc: true }) : res.json({ msg: "Error fetching", suc: false });
    }

    else {
      res.json({ msg: "Error fetching", suc: false });
    }

    // }
    // finally {
    //   await client.close();
    // }
  });

  // }
  // catch (err) {
  //   res.json({ msg: err, suc: false });
  // }


}

const setUser = async (req, res) => {

  console.log(req.body);

  try {

    // const id = new ObjectId(req.body.userid);
    console.log(req.body.userId, req.body.lauda);
    const database = await makeConnection({ db: "Docs", collections: req.body.userId }).catch(console.dir);
    const result = await database.insertOne({ source: req.body.userId });
    res.json({ msg: "Successfully initalised user documents", suc: true });

  }
  catch (err) {
    res.json({ msg: err, suc: false });
  }
  finally {
    client.close();
    console.log('client closed 23');
  }

}

const createFile = (req, res) => {

  jwt.verify(req.body.token, process.env.SECRETE_KEY, async (error, decoded) => {

    if (!error) {

      try {

        const database = await makeConnection({ db: "Docs", collections: decoded.id }).catch(console.dir);

        const exf = await database.findOne({filename:req.body.file.filename});

        if(!exf){

          const file = await database.insertOne(req.body.file);
          res.json({ msg: `Created ${req.body.file.filename}`, suc: true });

        }
        else{

          res.json({msg:`${req.body.file.filename} already exist`, suc:false});

        }


      }
      catch (err) {

        res.json({ msg: "Error in crearing file", suc: false });

      }
      finally {
        client.close();
        console.log("Client closed cf");
      }

    }
    else{

      res.json({msg:"Invalid token, session time out",suc:false});

    }

  })

}

export { fetchUser, setUser , createFile };