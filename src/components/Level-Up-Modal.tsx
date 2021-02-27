import React from 'react'
import Styles from '../styles/components/Level-Up-Modal.module.css'
import { ChallengesContext } from '../contexts/Challenge-Context'

export function LevelUpModal() {
  const { level, closeLevelUpModal } = React.useContext(ChallengesContext)
  return (
    <div className={Styles.overlay}>
      <div className={Styles.container}>
        <header>{level}</header>
        <strong>Parabéns</strong>
        <p>você atingiu um novo nível.</p>
        <button onClick={closeLevelUpModal}>
          <img src="/icons/close.svg" alt="Fechar modal" />
        </button>
      </div>
    </div>
  )
}