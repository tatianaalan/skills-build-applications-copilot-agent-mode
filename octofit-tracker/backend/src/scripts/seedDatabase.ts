import mongoose from 'mongoose'
import dotenv from 'dotenv'
import { User } from '../models/User'
import { Workout } from '../models/Workout'

dotenv.config()

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit'

const seedData = async (): Promise<void> => {
  try {
    await mongoose.connect(MONGODB_URI)
    console.log('\n📍 Connected to MongoDB')

    // Clear existing data
    await User.deleteMany({})
    await Workout.deleteMany({})
    console.log('🧹 Cleared existing data')

    // Create sample users
    const users = await User.insertMany([
      {
        username: 'john_fitness',
        email: 'john@octofit.com',
        password: 'password123'
      },
      {
        username: 'sarah_athlete',
        email: 'sarah@octofit.com',
        password: 'password456'
      },
      {
        username: 'mike_trainer',
        email: 'mike@octofit.com',
        password: 'password789'
      }
    ])
    console.log(`✅ Created ${users.length} users`)

    // Create sample workouts
    const workouts = await Workout.insertMany([
      {
        userId: users[0]._id,
        name: 'Morning Run',
        description: 'Morning cardio session in the park',
        duration: 45,
        calories: 450,
        date: new Date('2026-06-17'),
        exercises: [
          { name: 'Running', sets: 1, reps: 45, weight: 0 }
        ]
      },
      {
        userId: users[0]._id,
        name: 'Upper Body Strength',
        description: 'Focused on chest, shoulders, and arms',
        duration: 60,
        calories: 380,
        date: new Date('2026-06-16'),
        exercises: [
          { name: 'Bench Press', sets: 4, reps: 8, weight: 185 },
          { name: 'Dumbbell Rows', sets: 4, reps: 10, weight: 75 },
          { name: 'Shoulder Press', sets: 3, reps: 10, weight: 65 },
          { name: 'Bicep Curls', sets: 3, reps: 12, weight: 40 }
        ]
      },
      {
        userId: users[0]._id,
        name: 'Lower Body Blast',
        description: 'Legs and glutes workout',
        duration: 55,
        calories: 420,
        date: new Date('2026-06-15'),
        exercises: [
          { name: 'Squats', sets: 4, reps: 10, weight: 225 },
          { name: 'Leg Press', sets: 3, reps: 12, weight: 405 },
          { name: 'Lunges', sets: 3, reps: 10, weight: 50 },
          { name: 'Leg Curls', sets: 3, reps: 12, weight: 100 }
        ]
      },
      {
        userId: users[1]._id,
        name: 'Yoga Session',
        description: 'Relaxing yoga and flexibility work',
        duration: 50,
        calories: 180,
        date: new Date('2026-06-17'),
        exercises: [
          { name: 'Warm-up', sets: 1, reps: 10 },
          { name: 'Sun Salutations', sets: 5, reps: 1 },
          { name: 'Balance Poses', sets: 1, reps: 10 },
          { name: 'Cool Down Stretches', sets: 1, reps: 15 }
        ]
      },
      {
        userId: users[1]._id,
        name: 'HIIT Training',
        description: 'High intensity interval training',
        duration: 30,
        calories: 350,
        date: new Date('2026-06-16'),
        exercises: [
          { name: 'Burpees', sets: 4, reps: 10 },
          { name: 'Jump Squats', sets: 4, reps: 15 },
          { name: 'Mountain Climbers', sets: 4, reps: 20 },
          { name: 'Push-ups', sets: 4, reps: 12 }
        ]
      },
      {
        userId: users[2]._id,
        name: 'Cycling Session',
        description: 'Outdoor cycling route',
        duration: 75,
        calories: 550,
        date: new Date('2026-06-17'),
        exercises: [
          { name: 'Cycling', sets: 1, reps: 75, weight: 0 }
        ]
      },
      {
        userId: users[2]._id,
        name: 'Core Strength Training',
        description: 'Abdominal and core exercises',
        duration: 40,
        calories: 280,
        date: new Date('2026-06-15'),
        exercises: [
          { name: 'Planks', sets: 3, reps: 60 },
          { name: 'Crunches', sets: 3, reps: 20 },
          { name: 'Russian Twists', sets: 3, reps: 15 },
          { name: 'Leg Raises', sets: 3, reps: 12 }
        ]
      }
    ])
    console.log(`✅ Created ${workouts.length} workouts`)

    // Display summary statistics
    const totalUsers = await User.countDocuments()
    const totalWorkouts = await Workout.countDocuments()
    const totalCalories = await Workout.aggregate([
      { $group: { _id: null, total: { $sum: '$calories' } } }
    ])
    const totalDuration = await Workout.aggregate([
      { $group: { _id: null, total: { $sum: '$duration' } } }
    ])

    console.log('\n📊 Database Seed Summary:')
    console.log(`   Users: ${totalUsers}`)
    console.log(`   Workouts: ${totalWorkouts}`)
    console.log(`   Total Calories Burned: ${totalCalories[0]?.total || 0}`)
    console.log(`   Total Duration: ${totalDuration[0]?.total || 0} minutes`)
    console.log(`   Average Workout Duration: ${Math.round((totalDuration[0]?.total || 0) / totalWorkouts)} minutes`)

    console.log('\n✨ Database successfully populated with sample data!')
    console.log('🚀 Ready to start the server: npm run dev\n')

    await mongoose.disconnect()
  } catch (error) {
    console.error('❌ Error seeding database:', error)
    process.exit(1)
  }
}

seedData()
