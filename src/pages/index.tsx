import React from 'react'
import Head from 'next/head'
import Styles from '../styles/pages/Home.module.css'
import { GetServerSideProps } from 'next'
import { CompletedChallenges } from '../components/Completed-Challenges'
import { Countdown } from '../components/Countdown'
import { ExperienceBar } from '../components/Experience-Bar'
import { Profile } from '../components/Profile'
import { ChallengeBox } from '../components/Challenge-Box'
import { CountdownProvider } from '../contexts/Countdown-Context'
import { ChallengesProvider } from '../contexts/Challenge-Context'

interface HomeProps {
  level: number,
  currentExperience: number,
  challengesCompleted: number,
}

export default function Home({ level, currentExperience, challengesCompleted }: HomeProps) {
  return (
    <ChallengesProvider
      level={level}
      currentExperience={currentExperience}
      challengesCompleted={challengesCompleted}
    >
      <div className={Styles.container}>
        <Head>
          <title>Inicio|Move.It</title>
        </Head>
        <ExperienceBar />
        <CountdownProvider>
          <section>
            <div>
              <Profile />
              <CompletedChallenges />
              <Countdown />
            </div>
            <div>
              <ChallengeBox />
            </div>
          </section>
        </CountdownProvider>
      </div>
    </ChallengesProvider>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { level, currentExperience, challengesCompleted } = context.req.cookies
  return {
    props: {
      level: Number(level),
      currentExperience: Number(currentExperience),
      challengesCompleted: Number(challengesCompleted)
    }
  }
}