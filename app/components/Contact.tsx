'use client'

import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import * as THREE from 'three'
import styles from './Contact.module.css'

const Contact = () => {
  const [hoveredIcon, setHoveredIcon] = useState<string | null>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const contactInfo = [
    { type: 'linkedin', value: 'linkedin.com/in/yourprofile', label: 'LinkedIn' },
    { type: 'phone', value: '+1 (123) 456-7890', label: 'Phone' },
    { type: 'email', value: 'your.email@example.com', label: 'Email' },
  ]

  useEffect(() => {
    if (!canvasRef.current) return

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
    const renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current, alpha: true })

    renderer.setSize(window.innerWidth, window.innerHeight)

    const geometry = new THREE.TorusKnotGeometry(10, 3, 100, 16)
    const material = new THREE.MeshBasicMaterial({ color: 0xcccccc, wireframe: true })
    const torusKnot = new THREE.Mesh(geometry, material)
    scene.add(torusKnot)

    camera.position.z = 30

    const animate = () => {
      requestAnimationFrame(animate)
      torusKnot.rotation.x += 0.01
      torusKnot.rotation.y += 0.01
      renderer.render(scene, camera)
    }

    animate()

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  const iconVariants = {
    hidden: { scale: 0, rotate: -180 },
    visible: { scale: 1, rotate: 0, transition: { type: 'spring', stiffness: 260, damping: 20 } },
    hover: { scale: 1.2, rotate: 15 },
  }

  const linkVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { delay: 0.2 } },
  }

  return (
    <section className={`${styles.contact} ${styles.section}`} id="contact">
      <canvas ref={canvasRef} className={styles.contactBackground} />
      <motion.h2
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Contact Me
      </motion.h2>
      <div className={styles.contactContainer}>
        {contactInfo.map((info) => (
          <motion.div
            key={info.type}
            className={styles.contactItem}
            initial="hidden"
            animate="visible"
            whileHover="hover"
          >
            <motion.div
              className={styles.iconContainer}
              variants={iconVariants}
              onHoverStart={() => setHoveredIcon(info.type)}
              onHoverEnd={() => setHoveredIcon(null)}
            >
              <svg className={styles.icon} viewBox="0 0 100 100">
                {info.type === 'linkedin' && (
                  <path d="M20,35 L35,35 L35,80 L20,80 Z M27.5,20 A7.5,7.5 0 1,1 27.5,35 A7.5,7.5 0 1,1 27.5,20 M40,35 L55,35 L55,45 C58,38 66,34 74,35 C84,36 85,46 85,56 L85,80 L70,80 L70,56 C70,50 66,46 60,46 C54,46 55,50 55,56 L55,80 L40,80 Z" />
                )}
                {info.type === 'phone' && (
                  <path d="M30,20 L70,20 L70,80 L30,80 Z M40,15 L60,15 M40,85 L60,85 M50,75 C52,75 54,73 54,71 C54,69 52,67 50,67 C48,67 46,69 46,71 C46,73 48,75 50,75 Z" />
                )}
                {info.type === 'email' && (
                  <path d="M20,30 L80,30 L80,70 L20,70 Z M20,30 L50,50 L80,30 M20,70 L40,50 M60,50 L80,70" />
                )}
              </svg>
            </motion.div>
            <motion.a
              href={info.type === 'email' ? `mailto:${info.value}` : info.type === 'phone' ? `tel:${info.value}` : info.value}
              className={styles.contactLink}
              variants={linkVariants}
              initial="hidden"
              animate={hoveredIcon === info.type ? "visible" : "hidden"}
            >
              {info.label}
            </motion.a>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

export default Contact

