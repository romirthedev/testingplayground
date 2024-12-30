'use client'

import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import styles from './Projects.module.css'

const Projects = () => {
  const [currentProject, setCurrentProject] = useState(0)
  const carouselRef = useRef<HTMLDivElement>(null)

  const projects = [
    { title: 'Project 1', description: 'Description of Project 1' },
    { title: 'Project 2', description: 'Description of Project 2' },
    { title: 'Project 3', description: 'Description of Project 3' },
    { title: 'Project 4', description: 'Description of Project 4' },
  ]

  useEffect(() => {
    const rotateCarousel = () => {
      if (carouselRef.current) {
        const angle = (currentProject / projects.length) * -360
        carouselRef.current.style.transform = `translateZ(-400px) rotateY(${angle}deg)`
      }
    }

    rotateCarousel()
  }, [currentProject])

  return (
    <section className={`${styles.projects} ${styles.section}`} id="projects">
      <h2>My Projects</h2>
      <div className={styles.carouselContainer}>
        <div className={styles.carousel} ref={carouselRef}>
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              className={styles.project}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
            >
              <h3>{project.title}</h3>
              <p>{project.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
      <div className={styles.controls}>
        <button onClick={() => setCurrentProject((prev) => (prev - 1 + projects.length) % projects.length)}>
          Previous
        </button>
        <button onClick={() => setCurrentProject((prev) => (prev + 1) % projects.length)}>Next</button>
      </div>
    </section>
  )
}

export default Projects

