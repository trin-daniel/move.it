import React from 'react'
import Styles from '../styles/components/Profile.module.css'
import { ChallengesContext } from '../contexts/Challenge-Context'

export const Profile = () => {
  const { level } = React.useContext(ChallengesContext)
  return (
    <div className={Styles.container}>
      <img src="https://github.com/trin-daniel.png" alt="Carlos Daniel" />
      <div>
        <strong>Carlos Daniel</strong>
        <p>
          <img src="icons/level.svg" alt="Level" />
          Level {level}
        </p>
      </div>
    </div>
  )
}