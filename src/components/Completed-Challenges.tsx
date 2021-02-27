import React from 'react'
import Styles from '../styles/components/Completed-Challenges.module.css'
import { ChallengesContext } from '../contexts/Challenge-Context'

export const CompletedChallenges = () => {
  const { challengesCompleted } = React.useContext(ChallengesContext)
  return (
    <div className={Styles.container}>
      <span>Desafios completos</span>
      <span>{challengesCompleted}</span>
    </div>
  )
}