import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link, useNavigate } from 'react-router-dom'
import { 
  Home, 
  Calendar, 
  History, 
  User, 
  LogOut,
  Bell,
  ChevronLeft,
  ChevronRight,
  Video,
  Clock,
  MapPin,
  Phone,
  Mail,
  Plus
} from 'lucide-react'

const PatientPage = () => {
  const navigate = useNavigate()
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [activeMenu, setActiveMenu] = useState('home')
  const [showBookModal, setShowBookModal] = useState(false)
  const [notifications, setNotifications] = useState(3)

  // Mock data
  const patientData = {
    name: "Sarah Ahmed",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
    email: "sarah.ahmed@email.com",
    phone: "+92 300 1234567"
  }

  const summaryData = {
    doctors: { count: 12, label: "Available" },
    services: { description: "Telehealth, Diagnostics, Consultation" },
    appointments: { hasUpcoming: true }
  }

  const upcomingAppointment = {
    id: "APT-001",
    doctorName: "Dr. Ayesha Malik",
    doctorSpecialty: "Cardiologist",
    doctorImage: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=100&h=100&fit=crop&crop=face",
    date: "December 20, 2024",
    time: "2:30 PM",
    type: "Video Consultation",
    status: "Confirmed",
    meetingLink: "#"
  }

  const menuItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'appointments', label: 'My Appointments', icon: Calendar },
    { id: 'history', label: 'History', icon: History },
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'logout', label: 'Logout', icon: LogOut }
  ]

  const handleLogout = () => {
    // Clear all authentication data
    localStorage.removeItem('authToken')
    localStorage.removeItem('userData')
    sessionStorage.removeItem('sessionData')
    
    // Clear auth cookie
    document.cookie = 'authToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT'
    
    // Redirect to home page
    navigate('/')
  }

  const handleBookAppointment = () => {
    setShowBookModal(true)
  }

  const handleJoinLive = () => {
    // Navigate to live appointment or open video call
    console.log('Joining live appointment...')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0F172A] to-[#1E293B] font-inter">
      <div className="flex">
        {/* Sidebar */}
        <motion.div
          initial={{ x: -280 }}
          animate={{ x: 0 }}
          transition={{ duration: 0.5 }}
          className={`${sidebarCollapsed ? 'w-18' : 'w-70'} bg-[#111827] rounded-r-xl transition-all duration-300 flex flex-col`}
          style={{
            boxShadow: '0 2px 10px rgba(0, 0, 0, 0.15)',
            minHeight: '100vh'
          }}
        >
          {/* Toggle Button */}
          <div className="relative w-full">
            <button
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className={`absolute p-3 text-[#94A3B8] hover:text-[#F8FAFC] transition-all duration-300 z-30 bg-[#111827] rounded-lg hover:bg-[#1E293B] border border-[#1E293B] shadow-lg ${
                sidebarCollapsed ? 'top-2 right-2' : 'top-4 right-4'
              }`}
              aria-label={sidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
            >
              <motion.svg 
                className="w-5 h-5" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
                animate={{ rotate: sidebarCollapsed ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </motion.svg>
            </button>
          </div>

          {/* Patient Profile */}
          <div className={`${sidebarCollapsed ? 'p-2 pt-16' : 'p-6 pt-16'}`}>
            <div className="text-center">
              <img
                src={patientData.avatar}
                alt={patientData.name}
                className={`${sidebarCollapsed ? 'w-12 h-12' : 'w-30 h-30'} rounded-full object-cover mx-auto mb-4 transition-all duration-300`}
                style={{
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)'
                }}
              />
              <AnimatePresence>
                {!sidebarCollapsed && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <h3 className="text-lg font-semibold text-[#F8FAFC] mb-1">
                      {patientData.name}
                    </h3>
                    <p className="text-sm text-[#94A3B8]">
                      Patient
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Menu Items */}
          <div className={`flex-1 ${sidebarCollapsed ? 'px-2' : 'px-4'} pb-6`}>
            <div className="space-y-2">
              {menuItems.map((item, index) => (
                <motion.button
                  key={item.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  onClick={() => {
                    if (item.id === 'logout') {
                      handleLogout()
                    } else {
                      setActiveMenu(item.id)
                    }
                  }}
                  className={`w-full flex items-center ${sidebarCollapsed ? 'px-2 py-3 justify-center' : 'px-4 py-3'} rounded-lg transition-all duration-300 group ${
                    activeMenu === item.id
                      ? 'bg-gradient-to-r from-[#2563EB]/20 to-[#14B8A6]/20 border border-[#2563EB]/30 text-[#F8FAFC]'
                      : 'text-[#94A3B8] hover:text-[#F8FAFC] hover:bg-[#1E293B]/50'
                  }`}
                  style={activeMenu === item.id ? {
                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)'
                  } : {}}
                  title={sidebarCollapsed ? item.label : ''}
                >
                  <item.icon 
                    size={22} 
                    className={`transition-colors duration-300 ${
                      activeMenu === item.id 
                        ? 'text-[#F8FAFC]' 
                        : 'text-[#94A3B8] group-hover:text-[#F8FAFC]'
                    }`}
                  />
                  <AnimatePresence>
                    {!sidebarCollapsed && (
                      <motion.span
                        initial={{ opacity: 0, width: 0 }}
                        animate={{ opacity: 1, width: 'auto' }}
                        exit={{ opacity: 0, width: 0 }}
                        transition={{ duration: 0.3 }}
                        className="ml-3 font-medium"
                      >
                        {item.label}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </motion.button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Main Content */}
        <div className="flex-1 p-6">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex justify-between items-center mb-8"
          >
            <div>
              <h1 className="text-3xl font-bold text-[#F8FAFC] mb-2">
                Welcome back, {patientData.name.split(' ')[0]}!
              </h1>
              <p className="text-[#94A3B8]">
                Here's your health dashboard overview
              </p>
            </div>
            
            {/* Notifications and Profile */}
            <div className="flex items-center space-x-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="relative p-3 bg-[#1E293B]/50 rounded-full hover:bg-[#1E293B] transition-all duration-300"
              >
                <Bell className="w-6 h-6 text-[#94A3B8] hover:text-[#F8FAFC] transition-colors duration-300" />
                {notifications > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {notifications}
                  </span>
                )}
              </motion.button>
              
              <div className="flex items-center space-x-3">
                <img
                  src={patientData.avatar}
                  alt={patientData.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div className="text-right">
                  <p className="text-sm font-medium text-[#F8FAFC]">{patientData.name}</p>
                  <p className="text-xs text-[#94A3B8]">Patient</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Summary Cards */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
          >
            {/* Doctors Card */}
            <motion.div
              whileHover={{ scale: 1.02, y: -5 }}
              transition={{ duration: 0.3 }}
              className="bg-[#1E293B]/30 backdrop-blur-sm rounded-xl p-6 border border-white/10"
              style={{
                boxShadow: '0 0 8px rgba(37, 99, 235, 0.3), 0 0 8px rgba(20, 184, 166, 0.3)'
              }}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-blue-500/20 rounded-lg">
                  <User className="w-6 h-6 text-blue-400" />
                </div>
                <span className="text-2xl font-bold text-[#F8FAFC]">
                  {summaryData.doctors.count}
                </span>
              </div>
              <h3 className="text-lg font-semibold text-[#F8FAFC] mb-2">Doctors</h3>
              <p className="text-[#94A3B8] text-sm">{summaryData.doctors.label}</p>
            </motion.div>

            {/* Services Card */}
            <motion.div
              whileHover={{ scale: 1.02, y: -5 }}
              transition={{ duration: 0.3 }}
              className="bg-[#1E293B]/30 backdrop-blur-sm rounded-xl p-6 border border-white/10"
              style={{
                boxShadow: '0 0 8px rgba(37, 99, 235, 0.3), 0 0 8px rgba(20, 184, 166, 0.3)'
              }}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-teal-500/20 rounded-lg">
                  <Phone className="w-6 h-6 text-teal-400" />
                </div>
                <span className="text-xs text-[#94A3B8]">Available</span>
              </div>
              <h3 className="text-lg font-semibold text-[#F8FAFC] mb-2">Our Services</h3>
              <p className="text-[#94A3B8] text-sm">{summaryData.services.description}</p>
            </motion.div>

            {/* Appointments Card */}
            <motion.div
              whileHover={{ scale: 1.02, y: -5 }}
              transition={{ duration: 0.3 }}
              className="bg-[#1E293B]/30 backdrop-blur-sm rounded-xl p-6 border border-white/10"
              style={{
                boxShadow: '0 0 8px rgba(37, 99, 235, 0.3), 0 0 8px rgba(20, 184, 166, 0.3)'
              }}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-green-500/20 rounded-lg">
                  <Calendar className="w-6 h-6 text-green-400" />
                </div>
                {summaryData.appointments.hasUpcoming ? (
                  <span className="text-xs text-green-400">Upcoming</span>
                ) : (
                  <span className="text-xs text-[#94A3B8]">None</span>
                )}
              </div>
              <h3 className="text-lg font-semibold text-[#F8FAFC] mb-2">Appointments</h3>
              {summaryData.appointments.hasUpcoming ? (
                <p className="text-[#94A3B8] text-sm">Next: Dec 20, 2024</p>
              ) : (
                <div className="flex items-center justify-between">
                  <p className="text-[#94A3B8] text-sm">No upcoming</p>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleBookAppointment}
                    className="px-3 py-1 bg-gradient-to-r from-blue-600 to-teal-600 text-white rounded-lg text-xs font-medium hover:shadow-lg transition-all duration-300"
                  >
                    Book Now
                  </motion.button>
                </div>
              )}
            </motion.div>
          </motion.div>

          {/* Appointment Details Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-[#1E293B]/30 backdrop-blur-sm rounded-xl p-6 border border-white/10"
            style={{
              boxShadow: '0 0 8px rgba(37, 99, 235, 0.3), 0 0 8px rgba(20, 184, 166, 0.3)'
            }}
          >
            {summaryData.appointments.hasUpcoming ? (
              <div>
                <h2 className="text-xl font-semibold text-[#F8FAFC] mb-6">Upcoming Appointment</h2>
                <div className="flex flex-col lg:flex-row items-start lg:items-center space-y-4 lg:space-y-0 lg:space-x-6">
                  {/* Doctor Info */}
                  <div className="flex items-center space-x-4">
                    <img
                      src={upcomingAppointment.doctorImage}
                      alt={upcomingAppointment.doctorName}
                      className="w-16 h-16 rounded-full object-cover"
                    />
                    <div>
                      <h3 className="text-lg font-semibold text-[#F8FAFC]">
                        {upcomingAppointment.doctorName}
                      </h3>
                      <p className="text-[#94A3B8]">{upcomingAppointment.doctorSpecialty}</p>
                    </div>
                  </div>

                  {/* Appointment Details */}
                  <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="flex items-center space-x-2">
                      <Calendar className="w-4 h-4 text-[#94A3B8]" />
                      <span className="text-[#F8FAFC] text-sm">{upcomingAppointment.date}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Clock className="w-4 h-4 text-[#94A3B8]" />
                      <span className="text-[#F8FAFC] text-sm">{upcomingAppointment.time}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Video className="w-4 h-4 text-[#94A3B8]" />
                      <span className="text-[#F8FAFC] text-sm">{upcomingAppointment.type}</span>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex space-x-3">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleJoinLive}
                      className="px-6 py-2 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-lg font-medium hover:shadow-lg transition-all duration-300"
                    >
                      Join Live
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-6 py-2 border border-[#94A3B8] text-[#94A3B8] rounded-lg font-medium hover:bg-[#1E293B] hover:text-[#F8FAFC] transition-all duration-300"
                    >
                      Reschedule
                    </motion.button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="w-20 h-20 bg-[#1E293B]/50 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Calendar className="w-10 h-10 text-[#94A3B8]" />
                </div>
                <h3 className="text-xl font-semibold text-[#F8FAFC] mb-2">No Upcoming Appointments</h3>
                <p className="text-[#94A3B8] mb-6">
                  You don't have any scheduled appointments. Book one now to get started!
                </p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleBookAppointment}
                  className="px-8 py-3 bg-gradient-to-r from-blue-600 to-teal-600 text-white rounded-lg font-medium hover:shadow-lg transition-all duration-300"
                >
                  Book Appointment
                </motion.button>
              </div>
            )}
          </motion.div>
        </div>
      </div>

      {/* Book Appointment Modal */}
      <AnimatePresence>
        {showBookModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            onClick={() => setShowBookModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-[#1E293B] rounded-xl p-6 max-w-md w-full border border-white/10"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-xl font-semibold text-[#F8FAFC] mb-4">Book Appointment</h3>
              <p className="text-[#94A3B8] mb-6">
                This feature is coming soon! You'll be able to book appointments with our doctors.
              </p>
              <div className="flex space-x-3">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowBookModal(false)}
                  className="flex-1 px-4 py-2 bg-gradient-to-r from-blue-600 to-teal-600 text-white rounded-lg font-medium hover:shadow-lg transition-all duration-300"
                >
                  Got it
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default PatientPage
