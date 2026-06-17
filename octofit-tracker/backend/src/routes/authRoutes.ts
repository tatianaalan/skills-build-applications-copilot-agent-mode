import express, { Router, Request, Response } from 'express'
import { User } from '../models/User'

const router: Router = express.Router()

// Register endpoint
router.post('/register', async (req: Request, res: Response) => {
  try {
    const { username, email, password } = req.body

    if (!username || !email || !password) {
      return res.status(400).json({ error: 'All fields are required' })
    }

    const existingUser = await User.findOne({ $or: [{ username }, { email }] })
    if (existingUser) {
      return res.status(409).json({ error: 'User already exists' })
    }

    const user = new User({ username, email, password })
    await user.save()

    res.status(201).json({
      message: 'User registered successfully',
      userId: user._id
    })
  } catch (error) {
    res.status(500).json({ error: 'Registration failed' })
  }
})

// Login endpoint
router.post('/login', async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' })
    }

    const user = await User.findOne({ email })
    if (!user || user.password !== password) {
      return res.status(401).json({ error: 'Invalid credentials' })
    }

    res.json({
      message: 'Login successful',
      userId: user._id,
      username: user.username
    })
  } catch (error) {
    res.status(500).json({ error: 'Login failed' })
  }
})

export default router
