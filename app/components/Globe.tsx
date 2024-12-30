'use client'

import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import styles from './Globe.module.css'

const Globe = () => {
  const mountRef = useRef<HTMLDivElement>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!mountRef.current) return

    let scene: THREE.Scene
    let camera: THREE.PerspectiveCamera
    let renderer: THREE.WebGLRenderer
    let globe: THREE.Mesh
    let controls: OrbitControls
    let animationFrameId: number

    try {
      scene = new THREE.Scene()
      camera = new THREE.PerspectiveCamera(75, mountRef.current.clientWidth / mountRef.current.clientHeight, 0.1, 1000)
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })

      if (!renderer) {
        throw new Error("Unable to create WebGL renderer")
      }

      renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight)
      mountRef.current.appendChild(renderer.domElement)

      const geometry = new THREE.SphereGeometry(5, 32, 32)
      const texture = new THREE.TextureLoader().load('/earth_texture.jpg')
      const material = new THREE.MeshPhongMaterial({ map: texture })
      globe = new THREE.Mesh(geometry, material)
      scene.add(globe)

      const light = new THREE.PointLight(0xffffff, 1, 100)
      light.position.set(10, 10, 10)
      scene.add(light)

      camera.position.z = 15

      controls = new OrbitControls(camera, renderer.domElement)
      controls.enableDamping = true
      controls.dampingFactor = 0.25
      controls.enableZoom = false

      const animate = () => {
        animationFrameId = requestAnimationFrame(animate)
        controls.update()
        renderer.render(scene, camera)
      }

      animate()

      const handleResize = () => {
        if (!mountRef.current) return
        camera.aspect = mountRef.current.clientWidth / mountRef.current.clientHeight
        camera.updateProjectionMatrix()
        renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight)
      }

      window.addEventListener('resize', handleResize)

      return () => {
        window.removeEventListener('resize', handleResize)
        if (mountRef.current && renderer.domElement) {
          mountRef.current.removeChild(renderer.domElement)
        }
        cancelAnimationFrame(animationFrameId)
        controls.dispose()
        renderer.dispose()
        geometry.dispose()
        material.dispose()
      }
    } catch (err) {
      console.error("Error initializing WebGL:", err)
      setError("Unable to initialize 3D globe. Please ensure your browser supports WebGL.")
    }
  }, [])

  if (error) {
    return <div className={styles.error}>{error}</div>
  }

  return <div ref={mountRef} className={styles.globeContainer}></div>
}

export default Globe

