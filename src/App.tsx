import { useEffect, useRef } from 'react'
import Nav from './components/Nav'
import Hero from './components/Hero'
import Problem from './components/Problem'
import Benefits from './components/Benefits'
import HowItWorks from './components/HowItWorks'
import Products from './components/Products'
import Testimonials from './components/Testimonials'
import FAQ from './components/FAQ'
import FundingForm from './components/FundingForm'
import Footer from './components/Footer'

function App() {
  const observerRef = useRef<IntersectionObserver | null>(null)

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
          }
        })
      },
      { threshold: 0.1 }
    )

    document.querySelectorAll('.section-fade').forEach((el) => {
      observerRef.current?.observe(el)
    })

    return () => observerRef.current?.disconnect()
  }, [])

  return (
    <div className="bg-bg min-h-screen">
      <Nav />
      <Hero />
      <Problem />
      <Benefits />
      <HowItWorks />
      <Products />
      <Testimonials />
      <FAQ />
      <FundingForm />
      <Footer />
    </div>
  )
}

export default App
