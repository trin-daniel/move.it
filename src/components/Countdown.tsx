import React from 'react'
import Styles from '../styles/components/Countdown.module.css'
import { CountdownContext } from '../contexts/Countdown-Context'



export function Countdown() {

  const {
    minutes,
    seconds,
    hasFinished,
    isActive,
    resetCountdown,
    startCountdown
  } = React.useContext(CountdownContext)
  const [minutesLeft, minutesRight] = String(minutes).padStart(2, '0').split('')
  const [secondLeft, secondRight] = String(seconds).padStart(2, '0').split('')



  return (
    <div>
      <div className={Styles.container}>
        <div>
          <span>{minutesLeft}</span>
          <span>{minutesRight}</span>
        </div>
        <span>:</span>
        <div>
          <span>{secondLeft}</span>
          <span>{secondRight}</span>
        </div>
      </div>
      {hasFinished ? (
        <button
          disabled={true}
          className={Styles.buttonCountdown}
        >Ciclo encerrado</button>
      ) : (
          <React.Fragment>
            {isActive ?
              (
                <button
                  type="button"
                  className={`${Styles.buttonCountdown} ${Styles.buttonCountdownActive}`}
                  onClick={resetCountdown}
                >Abandonar o ciclo</button>
              ) :
              <button
                type="button"
                className={Styles.buttonCountdown}
                onClick={startCountdown}
              >Iniciar um ciclo</button>
            }
          </React.Fragment>
        )}
    </div>
  )
}