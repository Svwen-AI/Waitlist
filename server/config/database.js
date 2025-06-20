import mongoose from 'mongoose';
import { mongoURI } from './constants.js';
import logger from './logger.js';

let isConnected = false;

export async function connectDB() {
  if (isConnected) return;

  try {
    if (!mongoURI) {
      throw new Error('MONGODB_URI not found in environment variables');
    }

    const db = await mongoose.connect(mongoURI);

    isConnected = db.connections[0].readyState === 1;
    logger.info('MongoDB connected');
  } catch (err) {
    logger.error('MongoDB connection error:', err);
    throw err;
  }
}
