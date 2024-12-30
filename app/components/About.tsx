'use client'

import styles from './About.module.css'
import ParticleWeb from './ParticleWeb'

const About = () => {
  return (
    <section className={`${styles.about} ${styles.section}`} id="about">
      <ParticleWeb />
      <div className={styles.content}>
        <h2>About Me</h2>
        <p>
          I'm a passionate software engineer, product manager, leader, and researcher with a interest in cutting-edge technologies revolving around software & Machine Learning.
          I focus on developing innovative and viable solutions that push the boundaries of what's possible in the digital realm to address real-world problems of all scales.
        </p>
        <p>
          With a strong background in Machine Learning, Leadership, and Programming, I strive to create intelligent systems that can make a real impact. I have leveraged my background to benefit thousands globally.
          I have led organizations that have reached over 260,000 individuals in over 30 nations, where I've been able to see firsthand the impact of software.
          When I'm not coding or researching, you can find me playing tennis, gaming, or learning about algorithms.
        </p>
      </div>
    </section>
  )
}

export default About

