import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Link, useNavigate } from 'react-router-dom'

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const navigate = useNavigate()
  
  // Simulate login state (temporarily set to false)
  const isLoggedIn = false

  // Handle navigation to homepage sections
  const handleSectionNavigation = (sectionId) => {
    // Navigate to homepage first
    navigate('/')
    
    // Wait for navigation to complete, then scroll to section
    setTimeout(() => {
      const element = document.getElementById(sectionId)
      if (element) {
        element.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        })
      }
    }, 150) // Slightly longer delay to ensure navigation completes
  }

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Handle click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isDropdownOpen && !event.target.closest('.profile-dropdown-container')) {
        setIsDropdownOpen(false)
      }
    }
    
    if (isDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isDropdownOpen])

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
          <Link to="/" className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Apex Care
          </Link>
          
          {/* Navigation Links */}
          <div className="flex items-center space-x-4">
            <button
              onClick={() => handleSectionNavigation('home')}
              aria-label="Navigate to Home section"
              className="text-text-secondary hover:text-text-primary transition-colors duration-300 font-medium tracking-wide uppercase text-sm cursor-pointer focus:outline-none focus:ring-2 focus:ring-accent focus:ring-opacity-50 rounded px-2 py-1"
            >
              Home
            </button>
            <button
              onClick={() => handleSectionNavigation('about')}
              aria-label="Navigate to About section"
              className="text-text-secondary hover:text-text-primary transition-colors duration-300 font-medium tracking-wide uppercase text-sm cursor-pointer focus:outline-none focus:ring-2 focus:ring-accent focus:ring-opacity-50 rounded px-2 py-1"
            >
              About
            </button>
            <button
              onClick={() => handleSectionNavigation('contact')}
              aria-label="Navigate to Contact section"
              className="text-text-secondary hover:text-text-primary transition-colors duration-300 font-medium tracking-wide uppercase text-sm cursor-pointer focus:outline-none focus:ring-2 focus:ring-accent focus:ring-opacity-50 rounded px-2 py-1"
            >
              Contact Us
            </button>
          
            {/* Profile Icon with Dropdown */}
            <div className="relative profile-dropdown-container">
              <button 
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="p-2 rounded-full bg-surface/30 hover:bg-surface/50 hover:shadow-lg hover:shadow-primary/20 transition-all duration-300 group"
                style={{
                  boxShadow: '0 0 6px rgba(37, 99, 235, 0.3), 0 0 6px rgba(20, 184, 166, 0.3)'
                }}
              >
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

              {/* Dropdown Menu */}
              {isDropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.95 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                  className="absolute right-0 top-full mt-2 w-64 bg-surface/90 backdrop-blur-md rounded-xl border border-white/10 shadow-lg z-50"
                  style={{
                    boxShadow: '0 0 20px rgba(37, 99, 235, 0.4), 0 0 20px rgba(20, 184, 166, 0.4)'
                  }}
                >
                  {isLoggedIn ? (
                    // Logged in state
                    <div className="p-4">
                      <div className="flex items-center space-x-3 mb-4">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-r from-primary to-accent flex items-center justify-center">
                          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                          </svg>
                        </div>
                        <div>
                          <p className="text-text-primary font-semibold">John Doe</p>
                          <p className="text-text-secondary text-sm">john.doe@example.com</p>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <button className="w-full px-4 py-2 text-left text-text-primary hover:bg-surface/50 rounded-lg transition-colors duration-200">
                          View Profile
                        </button>
                        <button className="w-full px-4 py-2 text-left text-text-primary hover:bg-surface/50 rounded-lg transition-colors duration-200">
                          Logout
                        </button>
                      </div>
                    </div>
                  ) : (
                    // Not logged in state
                    <div className="p-4">
                      <div className="text-center mb-4">
                        <div className="w-12 h-12 rounded-full bg-surface/50 flex items-center justify-center mx-auto mb-3">
                          <svg className="w-6 h-6 text-text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                          </svg>
                        </div>
                        <p className="text-text-secondary text-sm">You're not signed in.</p>
                      </div>
                      <Link
                        to="/signin"
                        onClick={() => setIsDropdownOpen(false)}
                        className="block w-full px-4 py-2 bg-gradient-to-r from-primary to-accent text-white rounded-lg text-center font-semibold hover:shadow-lg transition-all duration-200"
                        style={{
                          boxShadow: '0 0 15px rgba(37, 99, 235, 0.4), 0 0 15px rgba(20, 184, 166, 0.4)'
                        }}
                      >
                        Sign In
                      </Link>
                    </div>
                  )}
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.nav>
  )
}

export default Navbar
