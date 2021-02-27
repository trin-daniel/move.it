import React from 'react'
import Cookies from 'js-cookie'
import challenges from '../../challenges.json'
import { LevelUpModal } from '../components/Level-Up-Modal'

interface ChallengesProviderProps {
  children: React.ReactNode,
  level: number,
  currentExperience: number,
  challengesCompleted: number,
}

interface Challenge {
  type: 'body' | 'eye',
  description: string,
  amount: number
}

interface ContextData {
  level: number,
  levelUp: () => void,
  startNewChallenge: () => void,
  experienceToNextLevel: number,
  resetChallenge: () => void,
  completeChallenge: () => void,
  closeLevelUpModal: () => void,
  currentExperience: number,
  challengesCompleted: number,
  activeChallenge: Challenge
}
export const ChallengesContext = React.createContext({} as ContextData)

export function ChallengesProvider({ children, ...rest }: ChallengesProviderProps) {
  const [level, setLevel] = React.useState<number>(rest.level ?? 1)
  const [currentExperience, setCurrentExperience] = React.useState<number>(rest.currentExperience ?? 0)
  const [challengesCompleted, setChallengesCompleted] = React.useState<number>(rest.challengesCompleted ?? 0)
  const [activeChallenge, setActiveChallenge] = React.useState<Challenge>(null)
  const [isLevelModalOpen, setIsLevelModalOpen] = React.useState<boolean>(false)
  const experienceToNextLevel = Math.pow((level + 1) * 4, 2)

  React.useEffect(() => { Notification.requestPermission() }, [])

  React.useEffect(() => {
    Cookies.set('level', level.toString())
    Cookies.set('currentExperience', currentExperience.toString())
    Cookies.set('challengesCompleted', challengesCompleted.toString())
  }, [level, currentExperience, challengesCompleted])

  function levelUp() {
    setLevel(level + 1)
    setIsLevelModalOpen(true)
  }

  function closeLevelUpModal() {
    setIsLevelModalOpen(false)
  }

  function startNewChallenge() {
    const randomChallenge = Math.floor(Math.random() * challenges.length)
    const challenge = challenges[randomChallenge] as Challenge
    setActiveChallenge(challenge)
    if (Notification.permission === 'granted') {
      new Audio('/notification.mp3').play()
      new Notification('Novo desafio 🎉', {

        body: `Valendo ${challenge.amount}xp!`
      })
    }

  }

  function resetChallenge() {
    setActiveChallenge(null)
  }

  function completeChallenge() {
    if (!activeChallenge) return;
    const { amount } = activeChallenge
    let finalExperience = currentExperience + amount
    if (finalExperience >= experienceToNextLevel) {
      finalExperience = finalExperience - experienceToNextLevel
      levelUp()
    }
    setCurrentExperience(finalExperience)
    setActiveChallenge(null)
    setChallengesCompleted(challengesCompleted + 1)
  }

  return (
    <ChallengesContext.Provider value={{
      level,
      levelUp,
      closeLevelUpModal,
      currentExperience,
      challengesCompleted,
      startNewChallenge,
      activeChallenge,
      resetChallenge,
      completeChallenge,
      experienceToNextLevel
    }}
    >
      {children}
      {isLevelModalOpen && < LevelUpModal />}
    </ChallengesContext.Provider>
  )
}