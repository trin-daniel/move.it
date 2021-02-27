import React from 'react'
import Styles from '../styles/components/Experience-Bar.module.css'
import { ChallengesContext } from '../contexts/Challenge-Context';

export const ExperienceBar = () => {
  const { currentExperience, experienceToNextLevel } = React.useContext(ChallengesContext)
  const percentToNextLevel = Math.round((currentExperience * 100) / experienceToNextLevel)
  return (
    <header className={Styles.experienceBar}>
      <span>0</span>
      <div>
        <div style={{ width: `${percentToNextLevel}%` }}>
          <span
            className={Styles.currentExperience}
            style={{ left: `${percentToNextLevel}%` }}>
            {currentExperience} xp
          </span>
        </div>
      </div>
      <span>{experienceToNextLevel} xp</span>
    </header >
  );
}