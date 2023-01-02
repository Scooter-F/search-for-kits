import mongodb from 'mongodb';
import { sampleData } from './KITS_SHIPPING_DATA.js';

const client = mongodb.MongoClient;

let database;
const collectionName = 'kits'

export const initDB = async () => {
  if (database) {
    return database;
  }

  const temp = await client.connect('mongodb://mongo:27017/', {
    useUnifiedTopology: true,
    maxPoolSize: 10,
  });
  database = temp.db('analytics');

  // seed data if it isn't already there (wouldn't need this in a real app)
  const collections = await database.listCollections().toArray();
  if (!collections.find((current) => current.name === collectionName)) {
    await database.collection(collectionName).insertMany(sampleData)
  }

  return database;
}