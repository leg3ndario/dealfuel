import { useEffect, useRef } from 'react'
import Nav from './components/Nav'
import HeroFAQ from './components/HeroFAQ'
import HowItWorks from './components/HowItWorks'
import Products from './components/Products'
import Testimonials from './components/Testimonials'
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
      <HeroFAQ />
      <HowItWorks />
      <Products />
      <Testimonials />
      <FundingForm />
      <Footer />
    </div>
  )
}

export default App
