import React from 'react'
import { ChallengesContext } from './Challenge-Context'

interface CountdownContextData {
  minutes: number,
  seconds: number,
  hasFinished: boolean,
  isActive: boolean,
  startCountdown: () => void,
  resetCountdown: () => void
}

interface CountdownProviderProps {
  children: React.ReactNode
}
export const CountdownContext = React.createContext({} as CountdownContextData)
let COUNTDOWN_TIMEOUT: NodeJS.Timeout


export function CountdownProvider({ children }: CountdownProviderProps) {
  const { startNewChallenge } = React.useContext(ChallengesContext)
  const [time, setTime] = React.useState<number>(25 * 60)
  const [hasFinished, setHasFinished] = React.useState<boolean>(false)
  const [isActive, setIsActive] = React.useState<boolean>(false)

  const minutes = Math.floor(time / 60)
  const seconds = time % 60

  React.useEffect(() => {
    if (isActive && time > 0) {
      COUNTDOWN_TIMEOUT = setTimeout(() => {
        setTime(time - 1);
      }, 1000)
    } else if (isActive && time === 0) {
      setHasFinished(true)
      setIsActive(false)
      startNewChallenge()
    }
  }, [isActive, time])

  function startCountdown() {
    setIsActive(true)
  }

  function resetCountdown() {
    clearTimeout(COUNTDOWN_TIMEOUT)
    setIsActive(false)
    setHasFinished(false)
    setTime(25 * 60)
  }

  return (
    <CountdownContext.Provider
      value={{
        minutes,
        seconds,
        hasFinished,
        isActive,
        startCountdown,
        resetCountdown
      }}
    >
      {children}
    </CountdownContext.Provider>
  )
}