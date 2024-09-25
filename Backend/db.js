import mongoose from 'mongoose';
import dotenv from 'dotenv';
// import method is used insteas of require method to import the modules
dotenv.config();

const mongoURL = process.env.MONGO_URL // Ensure you set MONGO_URL in your .env file
mongoose.connect(mongoURL, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;

db.on('connected', () => {
    console.log('Connected to MongoDB server');
});

db.on('error', (err) => {
    console.log('Error in connection to MongoDB server', err);
});

db.on('disconnected', () => {
    console.log('Disconnected from MongoDB server');
});

export default db;
