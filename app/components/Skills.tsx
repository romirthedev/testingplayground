'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import styles from './Skills.module.css'

const Skills = () => {
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null)

  const skills = [
    { name: 'React', level: 90 },
    { name: 'JavaScript', level: 85 },
    { name: 'TypeScript', level: 80 },
    { name: 'Node.js', level: 75 },
    { name: 'CSS', level: 85 },
    { name: 'HTML', level: 90 },
  ]

  return (
    <section className={`${styles.skills} ${styles.section}`} id="skills">
      <h2>My Skills</h2>
      <div className={styles.skillsContainer}>
        {skills.map((skill) => (
          <motion.div
            key={skill.name}
            className={styles.skillItem}
            onHoverStart={() => setHoveredSkill(skill.name)}
            onHoverEnd={() => setHoveredSkill(null)}
            whileHover={{ scale: 1.05 }}
          >
            <h3>{skill.name}</h3>
            <div className={styles.skillBar}>
              <motion.div
                className={styles.skillLevel}
                initial={{ width: 0 }}
                animate={{ width: `${skill.level}%` }}
                transition={{ duration: 1, ease: 'easeInOut' }}
              />
            </div>
            {hoveredSkill === skill.name && (
              <motion.span
                className={styles.skillPercentage}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.2 }}
              >
                {skill.level}%
              </motion.span>
            )}
          </motion.div>
        ))}
      </div>
    </section>
  )
}

export default Skills

