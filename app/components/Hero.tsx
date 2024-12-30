'use client'

import styles from './Hero.module.css'
import ParticleWeb from './ParticleWeb'

const Hero = () => {
  const name = "Hey! My name is Romir! I am a "
  const title = "Software Engineer | MIT Researcher | C-Level Executive | Philanthropist"

  return (
    <section className={`${styles.hero} ${styles.section}`} id="home">
      <ParticleWeb />
      <div className={styles.content}>
        <h1 className={styles.title}>{name}</h1>
        <p className={styles.description}>{title}</p>
        <div className={styles.cta}>
          <a href="#contact" className={styles.ctaButton}>
            Get in Touch
          </a>
          <a href="#work-history" className={`${styles.ctaButton} ${styles.secondary}`}>
            My Experiences
          </a>
        </div>
      </div>
    </section>
  )
}

export default Hero

