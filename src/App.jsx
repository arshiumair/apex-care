import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

// IoT Icons as SVG Components
const HeartIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
  </svg>
)

const ECGIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M3 12h4l3-8 4 16 3-8h4"/>
  </svg>
)

const ThermometerIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M15 13V5a3 3 0 0 0-6 0v8a5 5 0 1 0 6 0z"/>
    <path d="M12 1a1 1 0 0 1 1 1v1a1 1 0 0 1-2 0V2a1 1 0 0 1 1-1z"/>
  </svg>
)

const StethoscopeIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M6 4h8a4 4 0 0 1 4 4v8a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8a4 4 0 0 1 4-4z"/>
    <path d="M6 8h8"/>
    <path d="M6 12h8"/>
    <path d="M6 16h8"/>
  </svg>
)

// Floating IoT Icons Component
const FloatingIcons = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    <HeartIcon className="absolute top-20 left-10 w-8 h-8 text-accent opacity-20 animate-float drop-shadow-lg" />
    <ECGIcon className="absolute top-32 right-16 w-12 h-12 text-primary opacity-15 animate-float-delayed drop-shadow-lg" />
    <ThermometerIcon className="absolute top-48 left-1/4 w-6 h-6 text-accent opacity-25 animate-float-slow drop-shadow-lg" />
    <StethoscopeIcon className="absolute top-64 right-1/3 w-10 h-10 text-primary opacity-20 animate-float drop-shadow-lg" />
    <HeartIcon className="absolute bottom-32 left-1/3 w-7 h-7 text-accent opacity-15 animate-float-delayed drop-shadow-lg" />
    <ECGIcon className="absolute bottom-48 right-20 w-9 h-9 text-primary opacity-25 animate-float-slow drop-shadow-lg" />
    <ThermometerIcon className="absolute bottom-20 left-16 w-5 h-5 text-accent opacity-20 animate-float drop-shadow-lg" />
    <StethoscopeIcon className="absolute top-1/2 right-10 w-8 h-8 text-primary opacity-15 animate-float-delayed drop-shadow-lg" />
  </div>
)

// Navbar Component
const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (sectionId) => {
    document.getElementById(sectionId).scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-background/80 backdrop-blur-md' 
          : 'bg-transparent'
      }`}
      style={{
        borderBottom: '2px solid transparent',
        backgroundImage: isScrolled 
          ? 'linear-gradient(#0F172A, #0F172A) padding-box, linear-gradient(to right, #2563EB, #14B8A6) border-box'
          : 'linear-gradient(transparent, transparent) padding-box, linear-gradient(to right, #2563EB, #14B8A6) border-box',
        boxShadow: '0 2px 8px rgba(37, 99, 235, 0.4), 0 2px 8px rgba(20, 184, 166, 0.4)'
      }}
    >
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Brand */}
          <div className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Apex Care
          </div>
          
          {/* Navigation Links */}
          <div className="flex items-center space-x-8">
            <button 
              onClick={() => scrollToSection('home')}
              className="text-text-secondary hover:text-text-primary transition-colors duration-300 font-medium tracking-wide uppercase text-sm"
            >
              Home
            </button>
            <button 
              onClick={() => scrollToSection('about')}
              className="text-text-secondary hover:text-text-primary transition-colors duration-300 font-medium tracking-wide uppercase text-sm"
            >
              About
            </button>
            <button 
              onClick={() => scrollToSection('contact')}
              className="text-text-secondary hover:text-text-primary transition-colors duration-300 font-medium tracking-wide uppercase text-sm"
            >
              Contact Us
            </button>
            
            {/* Profile Icon */}
            <button className="p-2 rounded-full bg-surface/30 hover:bg-surface/50 hover:shadow-lg hover:shadow-primary/20 transition-all duration-300 group">
              <svg 
                className="w-6 h-6 text-text-secondary group-hover:text-text-primary transition-colors duration-300" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" 
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </motion.nav>
  )
}

// Hero Section Component
const HeroSection = () => {
  const scrollToContact = () => {
    document.getElementById('contact').scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-surface overflow-hidden">
      <FloatingIcons />
      
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto mt-16">
        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="text-5xl md:text-7xl font-bold text-text-primary mb-6 tracking-tight"
        >
          Smart Healthcare —{' '}
          <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Anywhere. Anytime.
          </span>
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="text-xl md:text-2xl text-text-secondary mb-16 leading-relaxed max-w-3xl mx-auto"
        >
          Apex Care connects doctors and patients through remote appointments, IoT health tracking, 
          and digital prescriptions — all in one platform.
        </motion.p>
        
        {/* Action Cards */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto"
        >
          {/* Card 1: Get Sign-In */}
          <motion.div
            whileHover={{ scale: 1.05, y: -5 }}
            transition={{ duration: 0.3 }}
            className="relative bg-surface/50 backdrop-blur-sm rounded-xl p-6 text-center hover:shadow-xl hover:shadow-primary/10 transition-all duration-300"
            style={{
              border: '2px solid transparent',
              background: 'linear-gradient(#1E293B, #1E293B) padding-box, linear-gradient(135deg, #2563EB, #14B8A6) border-box',
              boxShadow: '0 0 8px rgba(37, 99, 235, 0.5), 0 0 10px rgba(20, 184, 166, 0.5)'
            }}
          >
            <h3 className="text-2xl font-bold text-text-primary mb-3 tracking-wide">
              Get-In
            </h3>
            <p className="text-text-secondary mb-5 leading-relaxed">
              Access your account to manage your health easily.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-primary to-accent text-white px-4 py-3 rounded-full text-sm font-semibold tracking-wide uppercase shadow-lg hover:shadow-xl transition-all duration-300 hover:shadow-primary/25"
            >
              Sign In
            </motion.button>
          </motion.div>

          {/* Card 2: Our Services */}
          <motion.div
            whileHover={{ scale: 1.05, y: -5 }}
            transition={{ duration: 0.3 }}
            className="relative bg-surface/50 backdrop-blur-sm rounded-xl p-6 text-center hover:shadow-xl hover:shadow-primary/10 transition-all duration-300"
            style={{
              border: '2px solid transparent',
              background: 'linear-gradient(#1E293B, #1E293B) padding-box, linear-gradient(135deg, #2563EB, #14B8A6) border-box',
              boxShadow: '0 0 8px rgba(37, 99, 235, 0.5), 0 0 10px rgba(20, 184, 166, 0.5)'
            }}
          >
            <h3 className="text-2xl font-bold text-text-primary mb-3 tracking-wide">
              Our Services
            </h3>
            <p className="text-text-secondary mb-5 leading-relaxed">
              Find our services to get extensive care.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={scrollToContact}
              className="bg-gradient-to-r from-primary to-accent text-white px-6 py-3 rounded-full text-sm font-semibold tracking-wide uppercase shadow-lg hover:shadow-xl transition-all duration-300 hover:shadow-primary/25"
            >
              Learn More
            </motion.button>
          </motion.div>

          {/* Card 3: Paramedical Staff */}
          <motion.div
            whileHover={{ scale: 1.05, y: -5 }}
            transition={{ duration: 0.3 }}
            className="relative bg-surface/50 backdrop-blur-sm rounded-xl p-6 text-center hover:shadow-xl hover:shadow-primary/10 transition-all duration-300"
            style={{
              border: '2px solid transparent',
              background: 'linear-gradient(#1E293B, #1E293B) padding-box, linear-gradient(135deg, #2563EB, #14B8A6) border-box',
              boxShadow: '0 0 8px rgba(37, 99, 235, 0.5), 0 0 10px rgba(20, 184, 166, 0.5)'
            }}
          >
            <h3 className="text-2xl font-bold text-text-primary mb-3 tracking-wide">
              Our Staff
            </h3>
            <p className="text-text-secondary mb-5 leading-relaxed">
              Find our Board-certified doctors.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-primary to-accent text-white px-6 py-3 rounded-full text-sm font-semibold tracking-wide uppercase shadow-lg hover:shadow-xl transition-all duration-300 hover:shadow-primary/25"
            >
              Meet Our Team
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

// About Section Component
const AboutSection = () => {
  return (
    <section id="about" className="min-h-screen flex items-center justify-center bg-gradient-to-br from-surface to-background">
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
        className="text-center px-6 max-w-4xl mx-auto"
      >
        <h2 className="text-4xl md:text-6xl font-bold text-text-primary mb-8 tracking-tight">
          About <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Apex Care</span>
        </h2>
        
        <div className="space-y-6 text-lg md:text-xl text-text-secondary leading-relaxed">
          <p>
            Apex Care represents the future of healthcare delivery, seamlessly integrating cutting-edge 
            Internet of Things (IoT) technology with compassionate patient care. Our platform revolutionizes 
            how medical professionals connect with patients, breaking down geographical barriers and 
            making quality healthcare accessible to everyone, everywhere.
          </p>
          
          <p>
            Through our advanced IoT ecosystem, we enable real-time health monitoring, predictive analytics, 
            and personalized treatment plans. Our smart devices continuously track vital signs, medication 
            adherence, and lifestyle factors, providing doctors with comprehensive insights to deliver 
            proactive, data-driven care.
          </p>
          
          <p>
            From remote consultations and digital prescriptions to AI-powered health insights and 
            emergency response systems, Apex Care is building a connected healthcare ecosystem that 
            puts patients at the center of their own health journey while empowering healthcare 
            providers with unprecedented tools for diagnosis and treatment.
          </p>
        </div>
      </motion.div>
    </section>
  )
}

// Contact Section Component
const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Handle form submission here
    console.log('Form submitted:', formData)
    alert('Thank you for your message! We\'ll get back to you soon.')
    setFormData({ name: '', email: '', message: '' })
  }

  return (
    <section id="contact" className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-surface">
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
        className="w-full max-w-2xl mx-auto px-6"
      >
        <h2 className="text-4xl md:text-6xl font-bold text-text-primary mb-12 text-center tracking-tight">
          Contact <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Us</span>
        </h2>
        
        <form onSubmit={handleSubmit} className="space-y-8">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-6 py-4 bg-surface border border-surface/50 rounded-lg text-text-primary placeholder-text-secondary focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all duration-300"
            />
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-6 py-4 bg-surface border border-surface/50 rounded-lg text-text-primary placeholder-text-secondary focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all duration-300"
            />
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            viewport={{ once: true }}
          >
            <textarea
              name="message"
              placeholder="Your Message"
              value={formData.message}
              onChange={handleChange}
              required
              rows={6}
              className="w-full px-6 py-4 bg-surface border border-surface/50 rounded-lg text-text-primary placeholder-text-secondary focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all duration-300 resize-none"
            />
          </motion.div>
          
          <motion.button
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="w-full bg-gradient-to-r from-primary to-accent text-white px-8 py-4 rounded-lg text-lg font-semibold tracking-wide uppercase shadow-lg hover:shadow-xl transition-all duration-300 hover:shadow-primary/25"
          >
            Send Message
          </motion.button>
        </form>
      </motion.div>
    </section>
  )
}

// Footer Component
const Footer = () => {
  return (
    <footer className="bg-background border-t border-surface/30">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="text-center space-y-4">
          {/* Copyright */}
          <p className="text-text-secondary text-sm">
            © 2025 Apex Care. All rights reserved.
          </p>
          
          {/* Footer Links */}
          <div className="flex justify-center space-x-8">
            <button className="text-text-secondary hover:text-text-primary transition-colors duration-300 text-sm font-medium">
              Privacy Policy
            </button>
            <button className="text-text-secondary hover:text-text-primary transition-colors duration-300 text-sm font-medium">
              Terms of Service
            </button>
            <button className="text-text-secondary hover:text-text-primary transition-colors duration-300 text-sm font-medium">
              Support
            </button>
          </div>
        </div>
      </div>
    </footer>
  )
}

// Main App Component
const App = () => {
  return (
    <div className="min-h-screen bg-background text-text-primary font-inter">
      <Navbar />
      <HeroSection />
      <AboutSection />
      <ContactSection />
      <Footer />
    </div>
  )
}

export default App
