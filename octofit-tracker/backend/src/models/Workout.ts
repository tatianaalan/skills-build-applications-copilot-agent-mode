import mongoose, { Schema, Document } from 'mongoose'

export interface IWorkout extends Document {
  userId: mongoose.Types.ObjectId
  name: string
  description: string
  duration: number
  calories: number
  date: Date
  exercises: Array<{
    name: string
    sets: number
    reps: number
    weight?: number
  }>
  createdAt: Date
  updatedAt: Date
}

const workoutSchema = new Schema<IWorkout>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    name: {
      type: String,
      required: true
    },
    description: {
      type: String
    },
    duration: {
      type: Number,
      required: true,
      min: 1
    },
    calories: {
      type: Number,
      required: true,
      min: 0
    },
    date: {
      type: Date,
      required: true,
      default: Date.now
    },
    exercises: [
      {
        name: String,
        sets: Number,
        reps: Number,
        weight: Number
      }
    ]
  },
  { timestamps: true }
)

export const Workout = mongoose.model<IWorkout>('Workout', workoutSchema)
