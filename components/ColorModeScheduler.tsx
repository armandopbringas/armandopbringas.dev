import { useEffect, useRef } from 'react'
import { useColorMode } from '@chakra-ui/react'

const LIGHT_START_HOUR = 7
const DARK_START_HOUR = 19

const getModeForDate = (date: Date) => {
  const hour = date.getHours()
  if (hour >= LIGHT_START_HOUR && hour < DARK_START_HOUR) {
    return 'light'
  }
  return 'dark'
}

const getNextSwitchDate = (date: Date) => {
  const next = new Date(date)
  const hour = date.getHours()

  if (hour >= LIGHT_START_HOUR && hour < DARK_START_HOUR) {
    next.setHours(DARK_START_HOUR, 0, 0, 0)
    return next
  }

  if (hour < LIGHT_START_HOUR) {
    next.setHours(LIGHT_START_HOUR, 0, 0, 0)
    return next
  }

  next.setDate(next.getDate() + 1)
  next.setHours(LIGHT_START_HOUR, 0, 0, 0)
  return next
}

const ColorModeScheduler = () => {
  const { setColorMode } = useColorMode()
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    const applyModeAndSchedule = () => {
      const now = new Date()
      const desiredMode = getModeForDate(now)
      setColorMode(desiredMode)

      const nextSwitch = getNextSwitchDate(now)
      const timeoutMs = Math.max(1000, nextSwitch.getTime() - now.getTime())

      timeoutRef.current = setTimeout(() => {
        applyModeAndSchedule()
      }, timeoutMs)
    }

    applyModeAndSchedule()

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [setColorMode])

  return null
}

export default ColorModeScheduler
