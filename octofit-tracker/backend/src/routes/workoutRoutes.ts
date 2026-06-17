import express, { Router, Request, Response } from 'express'
import { Workout } from '../models/Workout'

const router: Router = express.Router()

// Get all workouts for a user
router.get('/:userId', async (req: Request, res: Response) => {
  try {
    const { userId } = req.params
    const workouts = await Workout.find({ userId }).sort({ date: -1 })

    res.json({
      message: 'Workouts retrieved successfully',
      count: workouts.length,
      workouts
    })
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve workouts' })
  }
})

// Create a new workout
router.post('/', async (req: Request, res: Response) => {
  try {
    const { userId, name, description, duration, calories, date, exercises } = req.body

    if (!userId || !name || !duration || calories === undefined) {
      return res.status(400).json({ error: 'Required fields missing' })
    }

    const workout = new Workout({
      userId,
      name,
      description,
      duration,
      calories,
      date: date || new Date(),
      exercises: exercises || []
    })

    await workout.save()
    res.status(201).json({
      message: 'Workout created successfully',
      workout
    })
  } catch (error) {
    res.status(500).json({ error: 'Failed to create workout' })
  }
})

// Update a workout
router.put('/:workoutId', async (req: Request, res: Response) => {
  try {
    const { workoutId } = req.params
    const updates = req.body

    const workout = await Workout.findByIdAndUpdate(
      workoutId,
      updates,
      { new: true, runValidators: true }
    )

    if (!workout) {
      return res.status(404).json({ error: 'Workout not found' })
    }

    res.json({
      message: 'Workout updated successfully',
      workout
    })
  } catch (error) {
    res.status(500).json({ error: 'Failed to update workout' })
  }
})

// Delete a workout
router.delete('/:workoutId', async (req: Request, res: Response) => {
  try {
    const { workoutId } = req.params

    const workout = await Workout.findByIdAndDelete(workoutId)
    if (!workout) {
      return res.status(404).json({ error: 'Workout not found' })
    }

    res.json({ message: 'Workout deleted successfully' })
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete workout' })
  }
})

export default router
