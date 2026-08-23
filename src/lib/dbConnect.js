import { MongoClient, ServerApiVersion } from "mongodb";

const uri = process.env.URI;

if (!uri) {
  throw new Error("Please add URI to .env.local");
}

const options = {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
};

let client;
let clientPromise;

if (process.env.NODE_ENV === "development") {
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options);
    global._mongoClientPromise = client.connect();
  }

  clientPromise = global._mongoClientPromise;
} else {
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

export async function connect(collectionName) {
  const connectedClient = await clientPromise;

  const database = connectedClient.db(process.env.DB_NAME);

  return database.collection(collectionName);
}
