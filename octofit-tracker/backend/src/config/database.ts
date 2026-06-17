import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db'

export const connectDatabase = async (): Promise<void> => {
  try {
    await mongoose.connect(MONGODB_URI)
    console.log('✓ Connected to MongoDB successfully')
  } catch (error) {
    console.error('✗ Failed to connect to MongoDB:', error)
    process.exit(1)
  }
}

export const disconnectDatabase = async (): Promise<void> => {
  try {
    await mongoose.disconnect()
    console.log('✓ Disconnected from MongoDB')
  } catch (error) {
    console.error('✗ Failed to disconnect from MongoDB:', error)
  }
}
