import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Link, useNavigate } from 'react-router-dom'

// Navbar Component (reused from main app)
const Navbar = () => {
  const [isScrolled, setIsScrolled] = React.useState(false)
  const navigate = useNavigate()

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

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

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
          <div className="flex items-center space-x-8">
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
          
          {/* Profile Icon */}
          <button 
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
        </div>
        </div>
      </div>
    </motion.nav>
  )
}

// Footer Component
const Footer = () => {
  return (
    <footer className="bg-background border-t border-surface/20 mt-20">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="text-center">
          <p className="text-text-secondary text-sm mb-4">
            © 2025 Apex Care. All rights reserved.
          </p>
          <div className="flex justify-center space-x-6">
            <Link 
              to="#" 
              className="text-text-secondary hover:text-text-primary transition-colors duration-300 text-sm"
            >
              Privacy Policy
            </Link>
            <Link 
              to="#" 
              className="text-text-secondary hover:text-text-primary transition-colors duration-300 text-sm"
            >
              Terms of Service
            </Link>
            <Link 
              to="#" 
              className="text-text-secondary hover:text-text-primary transition-colors duration-300 text-sm"
            >
              Support
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

const OurDoctors = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedSpecialty, setSelectedSpecialty] = useState('')

  // Helper function to check doctor availability
  const checkDoctorAvailability = (availability) => {
    const now = new Date()
    const currentDay = now.toLocaleDateString('en-US', { weekday: 'short' })
    const currentTime = now.toLocaleTimeString('en-US', { 
      hour12: false, 
      hour: '2-digit', 
      minute: '2-digit' 
    })
    
    const isDayAvailable = availability.days.includes(currentDay)
    const isTimeAvailable = currentTime >= availability.start && currentTime <= availability.end
    
    return isDayAvailable && isTimeAvailable
  }

  // Doctor data with availability information
  const doctors = [
    {
      id: 1,
      name: "Dr. Ayesha Malik",
      specialty: "Cardiologist",
      experience: "12 years",
      description: "Specialized in advanced cardiac treatment and preventive care",
      image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=300&h=300&fit=crop&crop=face",
      availability: { days: ["Mon", "Tue", "Wed", "Thu", "Fri"], start: "09:00", end: "17:00" }
    },
    {
      id: 2,
      name: "Dr. Hassan Khan",
      specialty: "Dermatologist",
      experience: "9 years",
      description: "Expert in cosmetic dermatology and skin cancer treatment",
      image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=300&h=300&fit=crop&crop=face",
      availability: { days: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"], start: "08:00", end: "18:00" }
    },
    {
      id: 3,
      name: "Dr. Sara Ahmed",
      specialty: "Pediatrician",
      experience: "7 years",
      description: "Dedicated to children's health and developmental care",
      image: "https://images.unsplash.com/photo-1659353888906-adb3e0041693?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1170",
      availability: { days: ["Mon", "Tue", "Wed", "Thu", "Fri"], start: "10:00", end: "16:00" }
    },
    {
      id: 4,
      name: "Dr. Fahad Ali",
      specialty: "Orthopedic Surgeon",
      experience: "10 years",
      description: "Specialized in joint replacement and sports medicine",
      image: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=300&h=300&fit=crop&crop=face",
      availability: { days: ["Mon", "Wed", "Fri"], start: "09:00", end: "15:00" }
    },
    {
      id: 5,
      name: "Dr. Maryam Noor",
      specialty: "Neurologist",
      experience: "8 years",
      description: "Expert in neurological disorders and brain health",
      image: "https://plus.unsplash.com/premium_photo-1702598599506-9ff660bc50f5?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjA5fHxwYWtpc3RhbmklMjBkb2N0b3J8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&q=60&w=600",
      availability: { days: ["Tue", "Thu", "Sat"], start: "08:30", end: "17:30" }
    },
    {
      id: 6,
      name: "Dr. Iqra Urooj",
      specialty: "Nephrologist",
      experience: "5 years",
      description: "Expert in nephrological disorders and kidney health",
      image: "https://media.licdn.com/dms/image/v2/D5603AQE3eqqmkeWZYA/profile-displayphoto-scale_400_400/B56ZlN085MKAAk-/0/1757947351742?e=1762992000&v=beta&t=6rUQrGI0Jg4h9CLgQonV0xJW6LkIUXEyWuG6rxrvc64",
      availability: { days: ["Mon", "Tue", "Wed", "Thu", "Fri"], start: "09:30", end: "16:30" }
    },
    {
      id: 7,
      name: "Dr. Omar Sheikh",
      specialty: "Psychiatrist",
      experience: "11 years",
      description: "Specialized in mental health and behavioral therapy",
      image: "https://plus.unsplash.com/premium_photo-1661578549774-7906388bc733?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1170",
      availability: { days: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"], start: "10:00", end: "19:00" }
    }
  ]

  // Get unique specialties for filter
  const specialties = [...new Set(doctors.map(doctor => doctor.specialty))]

  // Filter doctors based on search term and specialty
  const filteredDoctors = doctors.filter(doctor => {
    const matchesSearch = doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doctor.specialty.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesSpecialty = selectedSpecialty === '' || doctor.specialty === selectedSpecialty
    return matchesSearch && matchesSpecialty
  })

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0F172A] to-[#1E293B] font-inter">
      <Navbar />
      
      {/* Go Back Button */}
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="pt-24 px-6"
      >
        <Link 
          to="/" 
          className="inline-flex items-center text-text-secondary hover:text-text-primary transition-colors duration-300 text-sm font-medium"
        >
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Go Back
        </Link>
      </motion.div>

      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="text-center px-6 py-16"
      >
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl lg:text-6xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-6 tracking-tight">
            Meet Our Expert Doctors
          </h1>
          <p className="text-xl text-text-secondary leading-relaxed max-w-3xl mx-auto">
            Our board-certified specialists are dedicated to providing exceptional healthcare with cutting-edge technology and compassionate care.
          </p>
        </div>
      </motion.section>

      {/* Search and Filter Section */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="px-6 py-8"
      >
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search Bar */}
            <div className="flex-1">
              <input
                type="text"
                placeholder="Search by doctor name or specialty..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-6 py-4 bg-surface/30 backdrop-blur-sm border border-white/10 rounded-full text-text-primary placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-accent transition-all duration-300"
                style={{
                  boxShadow: '0 0 10px rgba(37, 99, 235, 0.3), 0 0 10px rgba(20, 184, 166, 0.3)'
                }}
              />
            </div>
            
            {/* Specialty Filter */}
            <div className="md:w-64">
              <select
                value={selectedSpecialty}
                onChange={(e) => setSelectedSpecialty(e.target.value)}
                className="w-full px-6 py-4 bg-surface/30 backdrop-blur-sm border border-white/10 rounded-full text-text-primary focus:outline-none focus:ring-2 focus:ring-accent transition-all duration-300"
                style={{
                  boxShadow: '0 0 10px rgba(37, 99, 235, 0.3), 0 0 10px rgba(20, 184, 166, 0.3)'
                }}
              >
                <option value="">All Specialties</option>
                {specialties.map(specialty => (
                  <option key={specialty} value={specialty}>{specialty}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Doctors Grid */}
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.8 }}
        className="px-6 py-16"
      >
        <div className="max-w-6xl mx-auto">
          <div className="space-y-6">
            {filteredDoctors.map((doctor, index) => (
              <motion.div
                key={doctor.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.0 + (index * 0.1) }}
                whileHover={{ 
                  y: -4,
                  transition: { duration: 0.3 }
                }}
                className="group relative"
              >
                 <div 
                   className="bg-surface/30 backdrop-blur-sm rounded-2xl p-8 border border-white/10 transition-all duration-300"
                   style={{
                     boxShadow: '0 0 15px rgba(37, 99, 235, 0.4), 0 0 15px rgba(20, 184, 166, 0.4)'
                   }}
                 >
                   <div className="flex flex-col lg:flex-row items-start lg:items-center space-y-6 lg:space-y-0 lg:space-x-8">
                     {/* Doctor Image */}
                     <div className="flex-shrink-0 mx-auto lg:mx-0">
                       <div className="relative">
                         <img
                           src={doctor.image}
                           alt={doctor.name}
                           className="w-32 h-32 rounded-full object-cover shadow-lg group-hover:scale-105 transition-transform duration-300"
                           style={{
                             boxShadow: '0 0 20px rgba(37, 99, 235, 0.5), 0 0 20px rgba(20, 184, 166, 0.5)'
                           }}
                         />
                         {/* Availability Status Badge */}
                         <div className="absolute -bottom-2 -right-2">
                           <div className={`px-3 py-1 rounded-full text-xs font-semibold ${
                             checkDoctorAvailability(doctor.availability)
                               ? 'bg-green-500/90 text-white'
                               : 'bg-red-500/90 text-white'
                           }`}>
                             {checkDoctorAvailability(doctor.availability) ? '🟢 Available' : '🔴 Unavailable'}
                           </div>
                         </div>
                       </div>
                     </div>

                     {/* Doctor Information */}
                     <div className="flex-1 min-w-0 text-center lg:text-left">
                       <h3 className="text-3xl font-bold text-text-primary mb-3 group-hover:text-accent transition-colors duration-300">
                         {doctor.name}
                       </h3>
                       <p className="text-xl text-accent font-semibold mb-2">
                         {doctor.specialty}
                       </p>
                       <p className="text-text-secondary mb-3 text-lg">
                         {doctor.experience} of experience
                       </p>
                       
                       {/* Availability Details */}
                       <div className="mb-4">
                         <p className="text-text-secondary text-sm mb-1">
                           Available: {doctor.availability.days.join(', ')}
                         </p>
                         <p className="text-text-secondary text-sm">
                           Hours: {doctor.availability.start} - {doctor.availability.end}
                         </p>
                       </div>
                       
                       <p className="text-text-secondary text-base leading-relaxed">
                         {doctor.description}
                       </p>
                     </div>

                     {/* Action Button */}
                     <div className="flex-shrink-0 w-full lg:w-auto">
                       <motion.button
                         whileHover={{ scale: 1.05 }}
                         whileTap={{ scale: 0.95 }}
                         disabled={!checkDoctorAvailability(doctor.availability)}
                         className={`w-full lg:w-auto px-8 py-4 rounded-full font-semibold transition-all duration-300 ${
                           checkDoctorAvailability(doctor.availability)
                             ? 'bg-gradient-to-r from-primary to-accent text-white hover:shadow-lg'
                             : 'bg-surface/50 text-text-secondary cursor-not-allowed'
                         }`}
                         style={checkDoctorAvailability(doctor.availability) ? {
                           boxShadow: '0 0 20px rgba(37, 99, 235, 0.4), 0 0 20px rgba(20, 184, 166, 0.4)'
                         } : {}}
                         onMouseEnter={(e) => {
                           if (checkDoctorAvailability(doctor.availability)) {
                             e.target.style.boxShadow = '0 0 30px rgba(37, 99, 235, 0.6), 0 0 30px rgba(20, 184, 166, 0.6)'
                           }
                         }}
                         onMouseLeave={(e) => {
                           if (checkDoctorAvailability(doctor.availability)) {
                             e.target.style.boxShadow = '0 0 20px rgba(37, 99, 235, 0.4), 0 0 20px rgba(20, 184, 166, 0.4)'
                           }
                         }}
                       >
                         {checkDoctorAvailability(doctor.availability) ? 'Book Appointment' : 'Currently Unavailable'}
                       </motion.button>
                     </div>
                   </div>
                 </div>

                {/* Enhanced Glow on Hover */}
                <div 
                  className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                  style={{
                    background: 'linear-gradient(135deg, rgba(37, 99, 235, 0.1) 0%, rgba(20, 184, 166, 0.1) 100%)',
                    boxShadow: '0 0 25px rgba(37, 99, 235, 0.6), 0 0 25px rgba(20, 184, 166, 0.6)'
                  }}
                ></div>
              </motion.div>
            ))}
          </div>

          {/* No Results Message */}
          {filteredDoctors.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16"
            >
              <p className="text-text-secondary text-lg">
                No doctors found matching your search criteria.
              </p>
            </motion.div>
          )}
        </div>
      </motion.section>

      {/* Call to Action Section */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.4 }}
        className="text-center px-6 py-16"
      >
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl lg:text-4xl font-bold text-text-primary mb-6">
            Can't Find the Right Specialist?
          </h2>
          <p className="text-lg text-text-secondary mb-8">
            Our team can help you find the perfect doctor for your specific needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/contact"
              className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-primary to-accent text-white rounded-full font-semibold hover:shadow-lg transition-all duration-300"
              style={{
                boxShadow: '0 0 20px rgba(37, 99, 235, 0.4), 0 0 20px rgba(20, 184, 166, 0.4)'
              }}
            >
              Contact Our Team
            </Link>
            <Link
              to="/services"
              className="inline-flex items-center justify-center px-8 py-4 border border-surface/50 text-text-primary rounded-full font-semibold hover:bg-surface/30 transition-all duration-300"
            >
              View Our Services
            </Link>
          </div>
        </div>
      </motion.section>

      <Footer />
    </div>
  )
}

export default OurDoctors
