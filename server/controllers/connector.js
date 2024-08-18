import { MongoClient , ServerApiVersion} from "mongodb";
import dotenv from "dotenv"; 
dotenv.config();

export const client = new MongoClient(process.env.MONGO_URI, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
    useUnifiedTopology:true
  }
  ,maxPoolSize:10
});

export async function makeConnection({ db, collections }) {
  try{
      await client.connect();
      const database = client.db(db).collection(collections);
      console.log("Connected to MongoDB");
      return database;
  }
  catch(err){
    console.log(err);
  }
}

