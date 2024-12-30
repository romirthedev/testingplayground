'use client'

import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import styles from './SpaceBackground.module.css'

const SpaceBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (!canvasRef.current) return

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
    const renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current, alpha: true })

    renderer.setSize(window.innerWidth, window.innerHeight)

    // Create particles
    const particlesGeometry = new THREE.BufferGeometry()
    const particlesCount = 200
    const posArray = new Float32Array(particlesCount * 3)
    const velocityArray = new Float32Array(particlesCount * 3)

    for (let i = 0; i < particlesCount * 3; i++) {
      posArray[i] = (Math.random() - 0.5) * 50
      velocityArray[i] = (Math.random() - 0.5) * 0.1
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3))

    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.2,
      color: 0x8a2be2,
      transparent: true,
      opacity: 0.8,
    })

    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial)
    scene.add(particlesMesh)

    camera.position.z = 30

    // Create lines between particles
    const lineMaterial = new THREE.LineBasicMaterial({ color: 0x8a2be2, transparent: true, opacity: 0.4 })
    const lines: THREE.Line[] = []

    const updateLines = () => {
      lines.forEach(line => scene.remove(line))
      lines.length = 0

      const positions = particlesGeometry.attributes.position.array
      for (let i = 0; i < particlesCount; i++) {
        for (let j = i + 1; j < particlesCount; j++) {
          const distance = Math.sqrt(
            Math.pow(positions[i * 3] - positions[j * 3], 2) +
            Math.pow(positions[i * 3 + 1] - positions[j * 3 + 1], 2) +
            Math.pow(positions[i * 3 + 2] - positions[j * 3 + 2], 2)
          )

          if (distance < 10) {
            const lineGeometry = new THREE.BufferGeometry().setFromPoints([
              new THREE.Vector3(positions[i * 3], positions[i * 3 + 1], positions[i * 3 + 2]),
              new THREE.Vector3(positions[j * 3], positions[j * 3 + 1], positions[j * 3 + 2]),
            ])
            const line = new THREE.Line(lineGeometry, lineMaterial)
            scene.add(line)
            lines.push(line)
          }
        }
      }
    }

    let animationFrameId: number

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate)

      const positions = particlesGeometry.attributes.position.array
      for (let i = 0; i < particlesCount * 3; i += 3) {
        positions[i] += velocityArray[i]
        positions[i + 1] += velocityArray[i + 1]
        positions[i + 2] += velocityArray[i + 2]

        // Bounce off the walls
        if (Math.abs(positions[i]) > 25) velocityArray[i] *= -1
        if (Math.abs(positions[i + 1]) > 25) velocityArray[i + 1] *= -1
        if (Math.abs(positions[i + 2]) > 25) velocityArray[i + 2] *= -1
      }

      particlesGeometry.attributes.position.needsUpdate = true

      updateLines()

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
      cancelAnimationFrame(animationFrameId)
      renderer.dispose()
      particlesGeometry.dispose()
      particlesMaterial.dispose()
      lineMaterial.dispose()
      lines.forEach(line => line.geometry.dispose())
    }
  }, [])

  return <canvas ref={canvasRef} className={styles.spaceBackground} />
}

export default SpaceBackground

