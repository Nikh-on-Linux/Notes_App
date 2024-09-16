import { makeConnection, client } from "./connector.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

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
          res.json({ msg: `Created ${req.body.file.filename}`, fileId: req.body.file.fileId, suc: true });

        }
        else {

          res.json({ msg: `${req.body.file.filename} already exist`, suc: false });

        }


      }
      catch (err) {

        res.json({ msg: `Error in crearing file ${err}`, suc: false });

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


        if (files) {

          res.json({ msg: "Found user data", docs: files, suc: true });

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

    await jwt.verify(req.body.token, process.env.SECRETE_KEY, async (error, decoded) => {

      if (!error) {

        const database = await makeConnection({ db: "Users", "collections": "Credentials" }).catch(console.dir);

        const results = await database.findOne({ email: decoded.email }, { projection: { password: 0 } });

        res.json({ msg: "Success fetching info", data: results, suc: true });
        // client.close();
      }

      else {

        res.json({ msg: "Invalid token 'userInfo'", suc: false });
        console.log(error);
        // client.close();
      }


    })


  }
  catch (err) {

    console.log(err);
    res.json({ msg: err, suc: false })
    // client.close();
  }
  finally {

    console.log('Client closed user 8');

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

const deleteFile = async (req, res) => {

  try {

    await jwt.verify(req.body.token, process.env.SECRETE_KEY, async (error, decoded) => {

      if (!error) {

        try {
          console.log(decoded);

          const database = await makeConnection({ db: "Docs", collections: decoded.id }).catch(console.dir);
          console.log(req.body.filename);
          const data = await database.find({});

          console.log(database.find())
          console.log(data);

          const response = await database.deleteOne({ filename: req.body.filename });

          response ? res.json({ msg: `Successfully deleted file ${req.body.filename}`, suc: true }) : res.json({ msg: `Failed in deleting file ${req.body.filename}` });

        }
        catch (err) {

          console.log(err);
          res.json({ msg: err, suc: false });

        }
        finally {

          client.close();
          console.log('Client closed DF 1');

        }
      }
      else {

        res.json({ msg: "Authentication failed, Invalid token", suc: false });

      }

    })

  }
  catch (err) {

    console.log(err);
    res.json({ msg: err, suc: false });

  }

}

const cloneFile = async (req, res) => {

  try {

    jwt.verify(req.body.token, process.env.SECRETE_KEY, async (error, decoded) => {

      if (!error) {

        try {

          const database = await makeConnection({ db: "Docs", collections: decoded.id }).catch(console.dir);

          const getFile = await database.findOne({ filename: req.body.filename }, { projection: { _id: 0 } });

          getFile.filename = `${req.body.filename}_#${Math.random() * 1000}`;

          getFile.fileId = req.body.fileId;

          const serverResponse = await fetch('http://localhost:3500/user/createfile', {
            method: "POST",
            headers: {
              'Content-Type': "application/json",
            },
            body: JSON.stringify({
              token: req.body.token,
              file: getFile
            })
          })

          const serverData = await serverResponse.json();

          if (serverData.suc) {

            res.json({ msg: `Cloned ${req.body.filename} successfully!`, fileId: req.body.fileId, suc: true });

          }
          else {

            res.json({ msg: `Error cloning the file, ${serverData.msg}`, suc: false });

          }
        }
        catch (err) {

          console.log(err);
          res.json({ msg: "Server error : clonning the file", suc: false });

        }
        finally {

          client.close();
          console.log("Client closed CL 1");

        }

      }
      else {

        res.json({ msg: "Authentication failed, In valid token", suc: false });

      }

    })

  }

  catch (err) {

    console.log(err);
    res.json({ msg: "Server error : cloning the file", suc: false });
  }


}

const renameFile = async (req, res) => {

  try {

    jwt.verify(req.body.token, process.env.SECRETE_KEY, async (error, decoded) => {

      if (!error) {

        try {

          const database = await makeConnection({ db: 'Docs', collections: decoded.id }).catch(console.dir);

          const fileData = await database.updateOne({ filename: req.body.filename }, { $set: { filename: req.body.newFilename } });

          fileData ? res.json({ msg: "Renamed file successfully", suc: true }) : res.json({ msg: "Unable to rename file", suc: false });

        }
        catch (err) {

          console.log(err);
          res.json({ msg: "Server side error", suc: false });

        }
        finally {

          client.close();
          console.log('Client closed RF 1');

        }

      }
      else {

        res.json({ msg: "Authentication error. Invalid token", suc: false });

      }

    })

  }
  catch (err) {

    console.log(err);
    res.json({ msg: "Intial endpoint error", suc: false });

  }

}

const loadFile = async (req, res) => {

  try {

    await jwt.verify(req.body.token, process.env.SECRETE_KEY, async (error, decoded) => {
      console.log(decoded.id);
      if (!error) {

        const database = await makeConnection({ db: "Docs", collections: decoded.id }).catch(console.dir);

        const document = await database.findOne({ fileId: req.body.fileId });

        console.log(document);

        document ? res.json({ msg: "Fetched file data", suc: true, data: document }) : res.json({ msg: "Failed to fetch data", suc: false });

        // client.close();
        console.log('client closed "Load file"');

      }
      else {

        res.json({ msg: "Invalid token", suc: false });
        // client.close()
        console.log('client closed "Load file"');

      }

    })

  }
  catch (err) {

    console.error('Load File Error ', err);

  }
  finally {
    client.close();
  }


}

const saveFile = async (req, res) => {

  await jwt.verify(req.body.token, process.env.SECRETE_KEY, async (error, decoded) => {

    if (!error) {

      const database = await makeConnection({ db: "Docs", collections: decoded.id }).catch(console.dir);

      const document = await database.updateOne({ fileId: req.body.fileId }, { $set: { filecontent: req.body.filecontent } })

      console.log(document);

      document ? res.json({ msg: "File saved", suc: true }) : res.json({ msg: "Error in saving file", suc: false });

    }
    else {

      res.json({ msg: "Invalid token", suc: false });

    }

  })

}

export { fetchUser, setUser, createFile, userInfo, loadHome, jwtBreakdown, deleteFile, cloneFile, renameFile, loadFile, saveFile };