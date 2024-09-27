const { MongoClient } = require('mongodb');
const dotenv = require('dotenv');

dotenv.config();

const uri = process.env.MONGOD_URI; 
const client = new MongoClient(uri);

let db;

async function connectDB() {
    try {
        await client.connect();
        console.log("Connected to MongoDB!");
        db = client.db('Room_matching'); // Replace with your database name
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
    }
}
// Function to get the collection
function getCollection(name) {
  if (!db) {
      throw new Error('Database not initialized. Call connectDB first.');
  }
  return db.collection(name);
}

// Export the connection and collection function
module.exports = {
  connectDB,
  getCollection,
  client: () => client
};