import { connect } from './db';

async function storeConversation(user_id, message, response) {
  const db = await connect();
  const collection = db.collection('conversations'); // replace with your collection name

  await collection.insertOne({
    user_id,
    message,
    response,
    timestamp: new Date(),
  });
}

async function getConversation(user_id) {
  const db = await connect();
  const collection = db.collection('conversations'); // replace with your collection name

  return await collection.find({ user_id }).toArray();
}

export { storeConversation, getConversation };
