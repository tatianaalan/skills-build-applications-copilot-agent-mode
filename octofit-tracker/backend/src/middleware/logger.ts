import { Request, Response, NextFunction } from 'express'

export const requestLogger = (req: Request, res: Response, next: NextFunction) => {
  const startTime = Date.now()
  const { method, path } = req

  res.on('finish', () => {
    const duration = Date.now() - startTime
    console.log(`[${new Date().toISOString()}] ${method} ${path} - ${res.statusCode} (${duration}ms)`)
  })

  next()
}
