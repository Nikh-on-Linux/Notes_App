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

        const exf = await database.findOne({ filename: req.body.file.filename });

        if (!exf) {

          const file = await database.insertOne(req.body.file);
          res.json({ msg: `Created ${req.body.file.filename}`, suc: true });

        }
        else {

          res.json({ msg: `${req.body.file.filename} already exist`, suc: false });

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
    else {

      res.json({ msg: "Invalid token, session time out", suc: false });

    }

  })

}


const loadHome = async (req, res) => {

  try {
    const token = req.body.token;
    await jwt.verify(token, process.env.SECRETE_KEY, async (err, decoded) => {

      if (!err) {

        const database = await makeConnection({ db: "Docs", collections: decoded.id }).catch(console.dir);

        const files = await database.find({ type: 'file' }).toArray();

        const response = await fetch('http://localhost:3500/user/userinfo', {
          method: "POST",
          headers: {
            'Content-Type': "application/json",
          },
          body: JSON.stringify({
            token: token
          })
        })

        const serverResponse = await response.json();

        if (serverResponse.suc) {

          res.json({ msg: "Found user data", docs: files, suc: true, user: serverResponse });

        }
        else {

          res.json({ msg: "Error fetching user data", suc: false });

        }
      }

      else {
        res.json({ msg: "Invalid token", suc: false });
      }

    })
  }
  catch (err) {

    res.json({ msg: err, suc: false });
    console.log(err);
    client.close();

  }

  // finally {

  //   client.close();
  //   console.log('Client closed user5')

  // }

}


const userInfo = async (req, res) => {

  try {

    console.log(req.body.token);

    await jwt.verify(req.body.token, process.env.SECRETE_KEY, async (error, decoded) => {

      if (!error) {

        const database = await makeConnection({ db: "Users", "collections": "Credentials" }).catch(console.dir);

        const results = await database.findOne({ email: decoded.email }, { projection: { password: 0 } });

        res.json({ msg: "Success fetching info", data: results, suc: true });

      }

      else {

        res.json({ msg: "Invalid token 'userInfo'", suc: false });
        console.log(error);

      }


    })


  }
  catch (err) {

    console.log(err);
    res.json({ msg: err, suc: false })

  }
  finally {

    console.log('Client closed user 8');
    client.close();

  }

}


const jwtBreakdown = async (req, res) => {
  await jwt.verify(req.body.token, process.env.SECRETE_KEY, async (error, decoded) => {

    if (!error) {

      res.json({ msg: "Decoded", suc: true, data: decoded.id });
      // eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImNoaWxsYXhtdXNpa2FAZ21haWwuY29tIiwiaWF0IjoxNzIzMzUxOTczfQ.Sxm2SrulAEbRUIkgytPzddjnmZYXkbeRco5-wwO78s4

    }

    else {
      res.json({ msg: error })
    }

  })
}

export { fetchUser, setUser, createFile, userInfo, loadHome, jwtBreakdown };