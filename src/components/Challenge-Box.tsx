import React from 'react'
import Styles from '../styles/components/Challenge-Box.module.css'
import { ChallengesContext } from '../contexts/Challenge-Context'
import { CountdownContext } from '../contexts/Countdown-Context'

export function ChallengeBox() {
  const {
    activeChallenge,
    resetChallenge,
    completeChallenge
  } = React.useContext(ChallengesContext)

  const { resetCountdown } = React.useContext(CountdownContext)
  function handleChallengeSucceeded() {
    completeChallenge()
    resetCountdown()
  }

  function handleChallengeFailed() {
    resetChallenge()
    resetCountdown()
  }
  return (

    <div className={Styles.container}>
      {activeChallenge ?
        (
          <div className={Styles.challengeActive}>
            <header>{activeChallenge.amount}</header>
            <main>
              <img src={`icons/${activeChallenge.type}.svg`} />
              <strong>Novo desafio</strong>
              <p>{activeChallenge.description}</p>
            </main>
            <footer>
              <button
                type="button"
                className={Styles.challengeFailedButton}
                onClick={handleChallengeFailed}
              >Falhei
              </button>
              <button
                type="button"
                className={Styles.challengeSucceededButton}
                onClick={handleChallengeSucceeded}
              >
                Completei
              </button>
            </footer>
          </div>
        ) : (
          <div className={Styles.challengeNotActive}>
            <strong>Termine um ciclo para receber uma recompensa</strong>
            <p>
              <img
                src="icons/happy_music.svg"
                alt="Level Up"
              />
              Suba de nível completando desafios.
            </p>
          </div>
        )}
    </div>
  )
}