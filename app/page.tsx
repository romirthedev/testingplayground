'use client'

import { useEffect, useRef } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import WorkHistory from './components/WorkHistory';
import Globe from './components/Globe';
import Contact from './components/Contact';
import Footer from './components/Footer';
import SpaceBackground from './components/SpaceBackground';
import styles from './page.module.css';

export default function Home() {
  return (
    <main className={styles.main}>
      <SpaceBackground />
      <Header />
      <Hero />
      <About />
      <WorkHistory />
      <Globe />
      <Contact />
      <Footer />
    </main>
  );
}

