'use client'

import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import styles from './ContactBackground.module.css'

const ContactBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (!canvasRef.current) return

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
    const renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current, alpha: true })

    renderer.setSize(window.innerWidth, window.innerHeight)

    // Add stars
    const starsGeometry = new THREE.BufferGeometry()
    const starsMaterial = new THREE.PointsMaterial({ color: 0xffffff, size: 0.1 })

    const starsVertices = []
    for (let i = 0; i < 1000; i++) {
      const x = (Math.random() - 0.5) * 2000
      const y = (Math.random() - 0.5) * 2000
      const z = -Math.random() * 2000
      starsVertices.push(x, y, z)
    }

    starsGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starsVertices, 3))
    const starField = new THREE.Points(starsGeometry, starsMaterial)
    scene.add(starField)

    // Load robot model
    const loader = new GLTFLoader()
    loader.load('/robot.glb', (gltf) => {
      const robot = gltf.scene
      robot.scale.set(0.5, 0.5, 0.5)
      robot.position.set(0, 0, -5)
      scene.add(robot)

      const animate = () => {
        requestAnimationFrame(animate)
        robot.rotation.y += 0.01
        starField.rotation.z += 0.0005
        renderer.render(scene, camera)
      }

      animate()
    })

    camera.position.z = 5

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

  return <canvas ref={canvasRef} className={styles.contactBackground} />
}

export default ContactBackground

