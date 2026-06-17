import express, { Express } from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { connectDatabase } from './config/database'
import { requestLogger } from './middleware/logger'
import { errorHandler } from './middleware/errorHandler'
import authRoutes from './routes/authRoutes'
import workoutRoutes from './routes/workoutRoutes'

dotenv.config()

const app: Express = express()
const PORT = process.env.PORT || 8000

// Middleware
app.use(cors())
app.use(express.json())
app.use(requestLogger)

// Routes
app.get('/api/health', (req, res) => {
  res.json({
    status: 'OK',
    message: 'OctoFit Tracker API is running',
    timestamp: new Date().toISOString()
  })
})

app.use('/api/auth', authRoutes)
app.use('/api/workouts', workoutRoutes)

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Endpoint not found' })
})

// Error handler
app.use(errorHandler)

// Connect to database and start server
const startServer = async (): Promise<void> => {
  try {
    await connectDatabase()
    app.listen(PORT, () => {
      console.log(`\n🚀 OctoFit Tracker API listening on port ${PORT}`)
      console.log(`📝 Health check: http://localhost:${PORT}/api/health`)
      console.log(`📚 API Documentation:`, {
        auth: {
          register: `POST http://localhost:${PORT}/api/auth/register`,
          login: `POST http://localhost:${PORT}/api/auth/login`
        },
        workouts: {
          getAll: `GET http://localhost:${PORT}/api/workouts/:userId`,
          create: `POST http://localhost:${PORT}/api/workouts`,
          update: `PUT http://localhost:${PORT}/api/workouts/:workoutId`,
          delete: `DELETE http://localhost:${PORT}/api/workouts/:workoutId`
        }
      })
    })
  } catch (error) {
    console.error('Failed to start server:', error)
    process.exit(1)
  }
}

startServer()
