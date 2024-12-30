'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import styles from './WorkHistory.module.css'

const jobs = [
  {
    title: 'Machine Learning & Polynomial Chaos Expansion Researcher',
    company: 'Massachusetts Institute of Technology, School of Engineering',
    period: '2024 - Present',
    description: 'Conducts research in Polynomial Chaos Expansion (PCE) and develops machine learning prediction models to analyze and quantify uncertainty in complex systems. Applies advanced statistical and computational techniques to model variability and uncertainty, leveraging PCE for efficient, high-dimensional analysis. Utilizes machine learning algorithms to enhance model predictions and improve the accuracy of decision-making in uncertain environments, supporting cutting-edge research and contributing to the development of advanced computational methods.',
    skills: ['Machine Learning Model Development', 'Cost-Effectiveness Analysis (PCE)', 'Matlab', 'SciKit', 'Tensorflow', 'PyTorch']
  },
  {
    title: 'Primary Simulation Researcher, CRISPR Researcher',
    company: 'Massachusetts Institute of Technology, Department of Chemistry',
    period: '2024 - Present',
    description: 'CRISPR researcher focused on analyzing historical data from clinical trials, case studies, and previous research to identify trends, insights, and areas for further investigation. In parallel, acts as the primary simulation developer, responsible for creating, refining, and testing simulation software to model CRISPR gene-editing processes. Combines deep domain knowledge of CRISPR with expertise in computational modeling to develop simulations that predict outcomes, assess efficiency, and guide experimental design, ultimately supporting the advancement of gene-editing technologies and their clinical applications.',
    skills: ['CRISPR Gene Editing', 'CRISPR Gene Editing', 'Simulation Development', 'Computational Modeling']
  },
  {
    title: 'Software Integration Researcher',
    company: 'Arizona State University',
    period: '2024 - Present',
    description: 'Developed scalable data processing pipelines and implemented advanced analytics solutions for big data problems.',
    skills: ['React', 'HTML/CSS', 'Arduino', 'Full-Stack Development', 'Java']
  },
  {
    title: 'Research Assistant',
    company: 'MIT AI Lab',
    period: '2014 - 2016',
    description: 'Assisted in various AI research projects, focusing on reinforcement learning and robotics applications.',
    skills: ['Robotics', 'Reinforcement Learning', 'ROS', 'MATLAB']
  },
]

const WorkHistory = () => {
  const [activeJob, setActiveJob] = useState(0)
  const timelineRef = useRef<HTMLDivElement>(null)

  const handleScroll = useCallback(() => {
    if (timelineRef.current) {
      const { top, height } = timelineRef.current.getBoundingClientRect()
      const scrollPosition = window.innerHeight / 2

      if (top <= scrollPosition && top + height >= scrollPosition) {
        const scrollPercentage = (scrollPosition - top) / height
        const jobIndex = Math.floor(scrollPercentage * jobs.length)
        setActiveJob(Math.min(jobIndex, jobs.length - 1))
      }
    }
  }, [])

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [handleScroll])

  return (
    <section className={styles.workHistory} id="work-history">
      <h2>Work Experience</h2>
      <div className={styles.timelineContainer}>
        <div className={styles.timeline} ref={timelineRef}>
          {jobs.map((job, index) => (
            <div
              key={index}
              className={`${styles.timelineItem} ${index === activeJob ? styles.active : ''}`}
            >
              <div className={styles.timelineContent}>
                <h3>{job.title}</h3>
                <h4>{job.company}</h4>
                <p>{job.period}</p>
              </div>
            </div>
          ))}
        </div>
        <div className={styles.jobDetails}>
          <h3>{jobs[activeJob].title}</h3>
          <h4>{jobs[activeJob].company}</h4>
          <p>{jobs[activeJob].period}</p>
          <p>{jobs[activeJob].description}</p>
          <div className={styles.skills}>
            {jobs[activeJob].skills.map((skill, index) => (
              <span key={index} className={styles.skill}>{skill}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default WorkHistory

