import { MongoClient } from 'mongodb';

const uri = process.env.MONGO_URI; // Your MongoDB Atlas URI
const client = new MongoClient(uri);

async function connect() {
  try {
      await client.connect();
  } catch (err) {
      // Handle the error here. 
      // The error might be due to the client already being connected.
      // In that case, you can safely ignore the error, but do log it for clarity.
      console.error(err);
  }

  const db = client.db('gptStore');
  return db;
}

export { connect };
