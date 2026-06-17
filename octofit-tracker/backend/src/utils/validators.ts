export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

export const validatePassword = (password: string): boolean => {
  return password.length >= 6
}

export const validateUsername = (username: string): boolean => {
  return username.length >= 3 && username.length <= 20
}

export const validateWorkoutData = (data: any): boolean => {
  return (
    data.userId &&
    data.name &&
    typeof data.duration === 'number' &&
    data.duration > 0 &&
    typeof data.calories === 'number' &&
    data.calories >= 0
  )
}
